async getCursosInscritosActivosPorUsuario(docInscr: string) {
  return this.prisma.$queryRawUnsafe<
    Array<{
      idCur: number;
      NombreCurso: string;
      Lugar: string;
      Inicio: Date;
      Fin: Date;
      Profesor: number;
      SegundoPro: number;
      CupoMax: number | null;
    }>
  >(
    `SELECT 
      c.id AS idCur,
      c.NombreCurso,
      c.Lugar,
      c.Inicio,
      c.Fin,
      c.Profesor,
      c.SegundoPro,
      c.CupoMax
    FROM gescur.Inscripciones i
    INNER JOIN gescur.Cursos c ON i.idCur = c.id
    WHERE i.docInscr = '${docInscr}' AND i.est = 1`
  );
}




@Get('usuario/:docInscr/activos')
getCursosInscritosActivosPorUsuario(@Param('docInscr') docInscr: string) {
  return this.inscripcionesService.getCursosInscritosActivosPorUsuario(docInscr);
}
