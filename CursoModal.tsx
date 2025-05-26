// OBTENER CURSOS POR DOCUMENTO DE INSCRITO
async getCoursesByDocInscr(docInscr: string) {
  return this.prisma.$queryRawUnsafe<
    Array<{
      idCur: number;
      NombreCurso: string;
      Inicio: Date;
      Fin: Date;
      Lugar: string;
      Valor: number;
      Horas: number;
      Profesor: number;
      SegundoPro: number;
      nombreProfesor: string | null;
      segundoProfe: string | null;
      CupoMax: number | null;
      fecreg: Date;
      Descripcion: string;
    }>
  >(
    `SELECT 
      c.id AS idCur,
      c.NombreCurso,
      c.Inicio,
      c.Fin,
      c.Lugar,
      c.Valor,
      c.Horas,
      c.Profesor,
      c.SegundoPro,
      p.nombre AS nombreProfesor,
      sp.nombre AS segundoProfe,
      c.CupoMax,
      i.fecreg,
      c.Descripcion
    FROM gescur.Inscripciones i
    LEFT JOIN gescur.Cursos c ON i.idCur = c.id
    LEFT JOIN gescur.emp_nomina p ON CAST(c.Profesor AS VARCHAR) = p.id_emp
    LEFT JOIN gescur.emp_nomina sp ON CAST(c.SegundoPro AS VARCHAR) = sp.id_emp
    WHERE i.docInscr = '${docInscr}'
      AND i.est = 1`
  );
}






@Get('cursos/:docInscr')
getCursosByDocInscr(@Param('docInscr') docInscr: string) {
  return this.inscripcionesService.getCoursesByDocInscr(docInscr);
}