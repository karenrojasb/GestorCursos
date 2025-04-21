async crearInscripcion(data: CreateInscripcionDto) {
  // Primero, buscamos si ya existe una inscripción con el mismo curso y documento de inscripción
  const inscripcionExistente = await this.prisma.inscripciones.findFirst({
    where: {
      idCur: data.idCur,
      docInscr: data.docInscr,
    },
  });

  if (inscripcionExistente) {
    // Si la inscripción ya existe, actualizar estado a `true`
    return this.prisma.inscripciones.update({
      where: { id: inscripcionExistente.id },
      data: { est: true },
    });
  }

  // Verificar si el cupo ha sido alcanzado
  const curso = await this.prisma.cursos.findUnique({
    where: { id: data.idCur },
    select: { CupoMax: true }, // Obtener el campo 'CupoMax'
  });

  if (!curso) {
    throw new NotFoundException('Curso no encontrado');
  }

  // Contamos cuántas inscripciones existen para este curso
  const inscripcionesContadas = await this.prisma.inscripciones.count({
    where: { idCur: data.idCur },
  });

  if (inscripcionesContadas >= curso.CupoMax) {
    throw new Error('El cupo máximo del curso ha sido alcanzado');
  }

  // Si no existe una inscripción y el cupo no ha sido alcanzado, creamos la inscripción
  return this.prisma.inscripciones.create({
    data: {
      idCur: data.idCur,
      docInscr: data.docInscr,
      est: true, // Estado siempre inicia en `true`
      fecreg: new Date(),
    },
  });
}