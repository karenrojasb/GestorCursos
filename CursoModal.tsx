// OBTENER TODAS LAS NOTAS POR ID DE CURSO
async getNotasPorCurso(idCurso: number) {
  const notas = await this.prisma.notas.findMany({
    where: {
      idCurso,
    },
    include: {
      Listas: {
        select: {
          Especificacion: true,
        },
      },
    },
  });

  const notasConInscrito = await Promise.all(notas.map(async (nota) => {
    const inscrito = await this.prisma.inscripciones.findFirst({
      where: {
        idCur: idCurso,
        id: nota.idInscrito, // O puedes mapear por docInscr si aplica
      },
      select: {
        docInscr: true,
      },
    });

    return {
      ...nota,
      docInscr: inscrito?.docInscr ?? null,
      Especificacion: nota.Listas?.Especificacion ?? null,
    };
  }));

  return notasConInscrito;
}





@Get('curso/:idCurso')
getNotasPorCurso(@Param('idCurso') idCurso: number) {
  return this.notasService.getNotasPorCurso(idCurso);
}