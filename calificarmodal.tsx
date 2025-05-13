// MÉTODO PARA CREAR NOTA
async createNote(CreateNotaDto: CreateNotaDto) {
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




export class CreateNotaDto {
  idCurso: number;
  idInscrito: number;
  Nota: number;
  idRegistro: number;
}
