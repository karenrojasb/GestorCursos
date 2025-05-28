async createRegistration(data: CreateInscripcionDto) {
  const inscripcionExistente = await this.prisma.inscripciones.findFirst({
    where: {
      idCur: data.idCur,
      docInscr: data.docInscr,
    },
  });

  if (inscripcionExistente) {
    // Si ya existe, solo actualiza `est` a true
    return this.prisma.inscripciones.update({
      where: { id: inscripcionExistente.id },
      data: { est: true },
    });
  }

  const curso = await this.prisma.cursos.findUnique({
    where: { id: data.idCur },
    select: { CupoMax: true },
  });

  if (!curso) {
    throw new NotFoundException('Curso no encontrado');
  }

  // Si no hay cupo máximo definido, simplemente crea la inscripción
  if (curso.CupoMax === null) {
    return this.prisma.inscripciones.create({
      data: {
        idCur: data.idCur,
        docInscr: data.docInscr,
        est: true,
        fecreg: new Date(),
      },
    });
  }

  // Solo contar inscripciones con est: true
  const inscripcionesActivas = await this.prisma.inscripciones.count({
    where: {
      idCur: data.idCur,
      est: true,
    },
  });

  if (inscripcionesActivas >= curso.CupoMax) {
    throw new Error('El cupo máximo del curso ha sido alcanzado');
  }

  return this.prisma.inscripciones.create({
    data: {
      idCur: data.idCur,
      docInscr: data.docInscr,
      est: true,
      fecreg: new Date(),
    },
  });
}