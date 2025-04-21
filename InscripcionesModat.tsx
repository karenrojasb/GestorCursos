async crearInscripcion(data: CreateInscripcionDto) {
  // Buscar si ya existe una inscripción con el mismo curso e id de usuario
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

  // Verificar si ya hay suficientes inscripciones en el curso para el público
  const inscripcionesPorCurso = await this.prisma.inscripciones.count({
    where: {
      idCur: data.idCur,
      est: true, // Solo contar inscripciones activas
    },
  });

  const curso = await this.prisma.cursos.findUnique({
    where: { id: data.idCur },
    select: { cupoMaximo: true, cupoPorPublico: true }, // Si tienes un cupo por público
  });

  // Validación para comprobar si el curso tiene espacio
  if (inscripcionesPorCurso >= curso.cupoMaximo) {
    throw new Error('El curso ya alcanzó su capacidad máxima de inscripciones');
  }

  // Si no existe, crear nueva inscripción
  return this.prisma.inscripciones.create({
    data: {
      idCur: data.idCur,
      docInscr: data.docInscr,
      est: true, // Estado siempre inicia en `true`
      fecreg: new Date(),
    },
  });
}