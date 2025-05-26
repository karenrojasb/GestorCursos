async createNote(CreateNotaDto: CreateNotaDto) {
  console.log('DTO recibido:', CreateNotaDto);

  try {
    const notaExistente = await this.prisma.notas.findFirst({
      where: {
        idCurso: CreateNotaDto.idCurso,
        idInscrito: CreateNotaDto.idInscrito,
      },
    });

    const fechaActual = new Date();

    if (notaExistente) {
      const nuevaNotaMasCompleta =
        CreateNotaDto.Nota !== null &&
        CreateNotaDto.Nota !== undefined &&
        CreateNotaDto.Nota !== notaExistente.Nota;

      if (nuevaNotaMasCompleta) {
        const notaActualizada = await this.prisma.notas.update({
          where: { id: notaExistente.id },
          data: {
            Nota: CreateNotaDto.Nota,
            idRegistro: CreateNotaDto.idRegistro,
            FechaRegistro: fechaActual,
          },
        });

        // Insertar en auditoriasnotas después de actualizar
        await this.prisma.$executeRawUnsafe(`
          INSERT INTO gescur.auditoriasnotas (idCurso, idInscrito, Nota, idRegistro, FechaRegistro)
          VALUES (${CreateNotaDto.idCurso}, ${CreateNotaDto.idInscrito}, ${CreateNotaDto.Nota}, ${CreateNotaDto.idRegistro}, '${fechaActual.toISOString()}')
        `);

        return notaActualizada;
      } else {
        return notaExistente;
      }
    } else {
      const newNote = await this.prisma.notas.create({
        data: {
          idCurso: CreateNotaDto.idCurso,
          idInscrito: CreateNotaDto.idInscrito,
          Nota: CreateNotaDto.Nota,
          idRegistro: CreateNotaDto.idRegistro,
          FechaRegistro: fechaActual,
        },
      });

      // Insertar en auditoriasnotas después de crear
      await this.prisma.$executeRawUnsafe(`
        INSERT INTO gescur.auditoriasnotas (idCurso, idInscrito, Nota, idRegistro, FechaRegistro)
        VALUES (${CreateNotaDto.idCurso}, ${CreateNotaDto.idInscrito}, ${CreateNotaDto.Nota}, ${CreateNotaDto.idRegistro}, '${fechaActual.toISOString()}')
      `);

      return newNote;
    }
  } catch (error) {
    console.error('Error al crear la nota:', error);
    throw new Error(`No se pudo crear la nota: ${error.message}`);
  }
}