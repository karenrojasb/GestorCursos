async createNote(CreateNotaDto: CreateNotaDto) {
  console.log('DTO recibido:', CreateNotaDto); // <--- esto es importante

  try {
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
  } catch (error) {
    console.error('Error al crear la nota:', error);
    throw new Error(`No se pudo crear la nota: ${error.message}`);
  }
}
