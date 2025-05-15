async createNote(CreateNotaDto: CreateNotaDto) {
  try {
    // Verificar si ya existe nota para idCurso e idInscrito
    const existingNote = await this.prisma.notas.findFirst({
      where: {
        idCurso: CreateNotaDto.idCurso,
        idInscrito: CreateNotaDto.idInscrito,
      },
    });

    if (existingNote) {
      // Actualizar nota existente en vez de crear
      const updatedNote = await this.prisma.notas.update({
        where: { id: existingNote.id },
        data: {
          Nota: CreateNotaDto.Nota,
          idRegistro: CreateNotaDto.idRegistro,
          FechaRegistro: new Date(),
        },
      });
      return updatedNote;
    } else {
      // Crear nueva nota
      const newNote = await this.prisma.notas.create({
        data: {
          idCurso: CreateNotaDto.idCurso,
          idInscrito: CreateNotaDto.idInscrito,
          Nota: CreateNotaDto.Nota,
          idRegistro: CreateNotaDto.idRegistro,
          FechaRegistro: new Date(),
        },
      });
      return newNote;
    }
  } catch (error) {
    console.error('Error al crear o actualizar la nota:', error);
    throw new Error(`No se pudo crear o actualizar la nota: ${error.message}`);
  }
}