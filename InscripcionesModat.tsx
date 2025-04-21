async getInscripcionesPorUsuario(docInscr: string) {
  return this.prisma.inscripciones.findMany({
    where: {
      docInscr,
      est: true
    },
    select: {
      idCur: true
    }
  });
}


@Get('usuario/:docInscr')
getInscripcionesPorUsuario(@Param('docInscr') docInscr: string) {
  return this.inscripcionesService.getInscripcionesPorUsuario(docInscr);
}