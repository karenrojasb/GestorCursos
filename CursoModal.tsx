async findByCursoAndInscrito(idCurso: number | string, idInscrito: number | string) {
  return this.prisma.notas.findFirst({
    where: {
      idCurso: Number(idCurso),
      idInscrito: Number(idInscrito),
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