
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
        return notaActualizada;
      } else {
      
        return notaExistente;
      }
    } else {
      // Si no existe nota, la crea
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
    console.error('Error al crear la nota:', error);
    throw new Error(`No se pudo crear la nota: ${error.message}`);
  }
}
