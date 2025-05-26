// Obtener una nota por idCurso e idInscrito con Especificación
async findByCursoAndInscrito(idCurso: number, idInscrito: number) {
  return this.prisma.notas.findFirst({
    where: {
      idCurso,
      idInscrito,
    },
    include: {
      Listas: {
        select: {
          Especificacion: true,
        },
      },
    },
  });
}





@Get('por-curso-inscrito/:idCurso/:idInscrito')
findByCursoAndInscrito(
  @Param('idCurso') idCurso: number,
  @Param('idInscrito') idInscrito: number,
) {
  return this.notasService.findByCursoAndInscrito(idCurso, idInscrito);
}


