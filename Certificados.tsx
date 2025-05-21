async createNote(CreateNotaDto: CreateNotaDto) {
  console.log('DTO recibido:', CreateNotaDto);

  try {
    const notaExistente = await this.prisma.notas.findFirst({
      where: {
        idCurso: CreateNotaDto.idCurso,
        idInscrito: CreateNotaDto.idInscrito,
      },
    });

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
            FechaRegistro: new Date(),
          },
        });

        // Insertar en AuditoriasNotas
        await this.prisma.$executeRawUnsafe(`
          INSERT INTO gescur.AuditoriasNotas (idNota, idCurso, idInscrito, Nota, idRegistro, FechaRegistro, accion)
          VALUES (${notaActualizada.id}, ${notaActualizada.idCurso}, ${notaActualizada.idInscrito}, ${notaActualizada.Nota}, ${notaActualizada.idRegistro}, GETDATE(), 'ACTUALIZAR')
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
          FechaRegistro: new Date(),
        },
      });

      // Insertar en AuditoriasNotas
      await this.prisma.$executeRawUnsafe(`
        INSERT INTO gescur.AuditoriasNotas (idNota, idCurso, idInscrito, Nota, idRegistro, FechaRegistro, accion)
        VALUES (${newNote.id}, ${newNote.idCurso}, ${newNote.idInscrito}, ${newNote.Nota}, ${newNote.idRegistro}, GETDATE(), 'CREAR')
      `);

      return newNote;
    }
  } catch (error) {
    console.error('Error al crear la nota:', error);
    throw new Error(`No se pudo crear la nota: ${error.message}`);
  }
}
