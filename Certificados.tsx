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

        // Insertar auditoría después de actualizar
        await this.prisma.$executeRawUnsafe(
          `INSERT INTO gescur.AuditoriasNotas (idCurso, idInscrito, Nota, idRegistro, FechaRegistro)
           VALUES (${notaActualizada.idCurso}, ${notaActualizada.idInscrito}, ${notaActualizada.Nota}, ${notaActualizada.idRegistro}, '${notaActualizada.FechaRegistro.toISOString()}')`
        );

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

      // Insertar auditoría después de crear
      await this.prisma.$executeRawUnsafe(
        `INSERT INTO gescur.AuditoriasNotas (idCurso, idInscrito, Nota, idRegistro, FechaRegistro)
         VALUES (${newNote.idCurso}, ${newNote.idInscrito}, ${newNote.Nota}, ${newNote.idRegistro}, '${newNote.FechaRegistro.toISOString()}')`
      );

      return newNote;
    }
  } catch (error) {
    console.error('Error al crear la nota:', error);
    throw new Error(`No se pudo crear la nota: ${error.message}`);
  }
}

async UpdateNote(id: number, data: Prisma.NotasUpdateInput) {
  console.log('id recibido:', id);
  console.log('data recibido:', data);

  try {
    const updatedNote = await this.prisma.notas.update({
      where: { id },
      data,
    });
    console.log('nota actualizada:', updatedNote);

    // Insertar auditoría después de actualizar
    await this.prisma.$executeRawUnsafe(
      `INSERT INTO gescur.AuditoriasNotas (idCurso, idInscrito, Nota, idRegistro, FechaRegistro)
       VALUES (${updatedNote.idCurso}, ${updatedNote.idInscrito}, ${updatedNote.Nota}, ${updatedNote.idRegistro}, '${updatedNote.FechaRegistro.toISOString()}')`
    );

    return updatedNote;
  } catch (error) {
    console.error('error al actualizar nota:', error);
    throw new Error('La nota no fue actualizada');
  }
}