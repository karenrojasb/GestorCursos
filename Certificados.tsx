  async createRegistration(data: CreateInscripcionDto) {
    const inscripcionExistente = await this.prisma.inscripciones.findFirst({
      where: {
        idCur: data.idCur,
        docInscr: data.docInscr,
      },
    });

    if (inscripcionExistente) {
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

    const inscripcionesContadas = await this.prisma.inscripciones.count({
      where: { idCur: data.idCur },
    });

    if (inscripcionesContadas >= curso.CupoMax) {
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
