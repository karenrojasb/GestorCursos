
async getCourses() {
  return this.prisma.$queryRawUnsafe(`
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
      c.Linea AS LineaId,
      l.Especificacion AS LineaNombre,    
      c.Estado AS EstadoId,
      est.Especificacion AS EstadoNombre, 
      c.Modalidad AS ModalidadId,
      m.Especificacion AS ModalidadNombre,
      u.nombre AS Unidad,                            
      c.Profesor,                          
      c.SegundoPro,
      sp.nombre AS SegundoProNombre,                        
      c.Proexterno,                       
      c.Descripcion,                       
      c.IdTipoCurso,
      tc.Especificacion AS TipoCursoNombre,
      e.nombre AS NombreProfesor,

      (
        SELECT 
          i.id,
          i.idCur,
          i.docInscr,
          i.est,
          i.fecreg,
          en.nombre AS NombreInscrito,
          JSON_QUERY(
            (
              SELECT 
                n.Nota,
                n.idRegistro,
                n.FechaRegistro,
                li.Especificacion AS NotaEspecificacion
              FROM gescur.Notas n
              LEFT JOIN gescur.Listas li ON li.id = n.Nota AND li.Tipo = 9
              WHERE n.IdCurso = i.idCur AND n.IdInscrito = i.docInscr
              FOR JSON PATH
            )
          ) AS Notas
        FROM gescur.Inscripciones i
        LEFT JOIN gescur.emp_nomina en ON CAST(en.id_emp AS VARCHAR) = LTRIM(RTRIM(i.docInscr))
        WHERE i.idCur = c.id AND i.est = 1
        FOR JSON PATH
      ) AS Inscritos

    FROM gescur.cursos c
    LEFT JOIN gescur.listas lp ON lp.id = c.Publico AND lp.Tipo = 1
    LEFT JOIN gescur.listas l ON l.id = c.Linea AND l.Tipo = 2
    LEFT JOIN gescur.listas m ON m.id = c.Modalidad AND m.Tipo = 3
    LEFT JOIN gescur.listas est ON est.id = c.Estado AND est.Tipo = 4
    LEFT JOIN gescur.listas tc ON tc.id = c.IdTipoCurso AND tc.Tipo = 8
    LEFT JOIN gescur.emp_nomina e ON c.Profesor = e.id_emp    
    LEFT JOIN gescur.emp_nomina sp ON CAST(c.SegundoPro AS VARCHAR) = sp.id_emp
    LEFT JOIN gescur.unidad u ON c.Unidad = u.codigo
  `);
}
