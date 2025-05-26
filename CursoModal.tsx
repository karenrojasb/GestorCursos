// OBTENER INSCRITOS POR ID DE CURSO
async getRegistrationsByCourseId(idCur: number) {
  return this.prisma.$queryRawUnsafe<
    Array<{
      id: number;
      idCur: number;
      NombreCurso: string;
      docInscr: string;
      nombre: string | null;
      est: boolean;
      fecreg: Date;
      Profesor: number;
      SegundoPro: number;
      CupoMax: number | null;
      Proexterno: string;
    }>
  >(
    `SELECT 
      i.id, 
      i.idCur, 
      c.NombreCurso, 
      i.docInscr, 
      e.nombre, 
      i.est, 
      i.fecreg,
      c.Profesor,
      c.SegundoPro,
      c.CupoMax,
      c.Proexterno
    FROM gescur.Inscripciones i
    LEFT JOIN gescur.Cursos c ON i.idCur = c.id
    LEFT JOIN gescur.emp_nomina e ON i.docInscr = e.id_emp
    WHERE i.est = 1 AND i.idCur = ${idCur}`
  );
}


@Get('curso/:id')
getByCourseId(@Param('id') id: number) {
  return this.inscripcionesService.getRegistrationsByCourseId(id);
}