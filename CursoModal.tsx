async getCourses() {
  return this.prisma.$queryRaw`
    SELECT 
      c.id,
      c.NombreCurso,
      c.Valor,
      lp.Especificacion AS Publico,
      c.Periodo,
      c.Inicio,
      c.Fin,
      c.InicioInscr,
      c.FinInscr,
      c.Horas,
      c.CupoMax,
      c.Lugar,
      c.LunesIni,
      c.LunesFin,
      c.MartesIni,
      c.MartesFin,
      c.MiercolesIni,
      c.MiercolesFin,
      c.JuevesIni,
      c.JuevesFin,
      c.ViernesIni,
      c.ViernesFin,
      c.SabadoIni,
      c.SabadoFin,
      c.DomingoIni,
      c.DomingoFin,
      c.Linea,
      l.Especificacion AS Linea,
      c.Estado,
      est.Especificacion AS Estado,
      c.Modalidad,
      m.Especificacion AS Modalidad,
      u.nombre AS Unidad,
      c.Profesor,
      c.SegundoPro,
      sp.nombre AS SegundoPro,
      c.Proexterno,
      c.Descripcion,
      c.IdTipoCurso,
      tc.Especificacion AS IdTipoCurso,
      e.nombre AS NombreProfesor,

      -- SUBCONSULTA: Agregar inscritos al curso como array JSON
      (
        SELECT json_agg(ins)
        FROM (
          SELECT 
            n.id,
            n.IdInscrito,
            n.Nota,
            n.idRegistro,
            n.FechaRegistro,
            i.fecreg
          FROM gescur."Notas" n
          LEFT JOIN gescur."Inscripciones" i ON n.IdInscrito = i.docInscr
          WHERE n.IdCurso = c.id
        ) ins
      ) AS inscritos

    FROM gescur.cursos c
    LEFT JOIN gescur.listas lp ON lp.id = c.Publico AND lp.Tipo = 1
    LEFT JOIN gescur.listas l ON l.id = c.Linea AND l.Tipo = 2
    LEFT JOIN gescur.listas m ON m.id = c.Modalidad AND m.Tipo = 3
    LEFT JOIN gescur.listas est ON est.id = c.Estado AND est.Tipo = 4
    LEFT JOIN gescur.listas tc ON tc.id = c.IdTipoCurso AND tc.Tipo = 8
    LEFT JOIN gescur.emp_nomina e ON c.Profesor = e.id_emp    
    LEFT JOIN gescur.emp_nomina sp ON CAST(c.SegundoPro AS VARCHAR) = sp.id_emp
    LEFT JOIN gescur.unidad u ON c.Unidad = u.codigo
  `;
}