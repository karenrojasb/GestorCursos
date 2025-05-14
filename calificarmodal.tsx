// Obtener una nota por idCurso e idInscrito
async findByCursoAndInscrito(idCurso: number, idInscrito: number) {
  return this.prisma.notas.findFirst({
    where: {
      idCurso,
      idInscrito,
    },
  });
}



@Get('curso-inscrito')
async getNotaPorCursoEInscrito(
  @Query('idCurso') idCurso: number,
  @Query('idInscrito') idInscrito: number
) {
  return this.notasService.findByCursoAndInscrito(Number(idCurso), Number(idInscrito));
}