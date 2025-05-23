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
                li.Especificacion AS NotaEspecificacion,
                emp.nombre AS NombreRegistro
              FROM gescur.Notas n
              LEFT JOIN gescur.Listas li ON li.id = n.Nota AND li.Tipo = 9
              LEFT JOIN gescur.emp_nomina emp ON LTRIM(RTRIM(CAST(emp.id_emp AS VARCHAR))) = LTRIM(RTRIM(n.idRegistro))
              WHERE n.IdCurso = i.idCur AND n.IdInscrito = i.docInscr
              FOR JSON PATH
            )
          ) AS Notas
        FROM gescur.Inscripciones i
        LEFT JOIN gescur.emp_nomina en ON LTRIM(RTRIM(CAST(en.id_emp AS VARCHAR))) = LTRIM(RTRIM(i.docInscr))
        WHERE i.idCur = c.id AND i.est = 1
        FOR JSON PATH
      ) AS Inscritos

    FROM gescur.cursos c
    LEFT JOIN gescur.listas lp ON lp.id = c.Publico AND lp.Tipo = 1
    LEFT JOIN gescur.listas l ON l.id = c.Linea AND l.Tipo = 2
    LEFT JOIN gescur.listas m ON m.id = c.Modalidad AND m.Tipo = 3
    LEFT JOIN gescur.listas est ON est.id = c.Estado AND est.Tipo = 4
    LEFT JOIN gescur.listas tc ON tc.id = c.IdTipoCurso AND tc.Tipo = 8
    LEFT JOIN gescur.emp_nomina e ON LTRIM(RTRIM(CAST(e.id_emp AS VARCHAR))) = LTRIM(RTRIM(CAST(c.Profesor AS VARCHAR)))
    LEFT JOIN gescur.emp_nomina sp ON LTRIM(RTRIM(CAST(sp.id_emp AS VARCHAR))) = LTRIM(RTRIM(CAST(c.SegundoPro AS VARCHAR)))
    LEFT JOIN gescur.unidad u ON c.Unidad = u.codigo
  `);
}



//  OBTENER CURSOS POR ID DEL USUARIO
async getCoursesUser(id_emp: string) {
  try {
      // OBTENER EL VALOR DE "PÚBLICO" DEL USUARIO
      const usuario = await this.prisma.$queryRaw<{ publico: number }[]>`
          SELECT publico FROM gescur.emp_nomina WHERE id_emp = CAST(${id_emp} AS VARCHAR)
      `;

      if (!usuario || usuario.length === 0) {
          throw new Error('Usuario no encontrado en gescur.emp_nomina');
      }

      const publico = usuario[0].publico;

      console.log(`Usuario ${id_emp} tiene publico: ${publico}`);

      // OBTENER CURSOS SEGÚN EL PÚBLICO
      let cursos;
      if (publico === 3) {
          cursos = await this.prisma.$queryRaw`
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
                  c.CupoMax,
                  c.Lugar,
                  c.Linea,
                  c.Proexterno, 
                  l.Especificacion AS Linea,
                  c.Estado,
                  est.Especificacion AS Estado,
                  c.Modalidad,
                  m.Especificacion AS Modalidad,
                  u.nombre AS Unidad,
                  e.nombre AS NombreProfesor,
                  sp.nombre AS SegundoProNombre
              FROM gescur.cursos c
              LEFT JOIN gescur.listas lp ON lp.id = c.Publico AND lp.Tipo = 1
              LEFT JOIN gescur.listas l ON l.id = c.Linea AND l.Tipo = 2
              LEFT JOIN gescur.listas m ON m.id = c.Modalidad AND m.Tipo = 3
              LEFT JOIN gescur.listas est ON est.id = c.Estado AND est.Tipo = 4
              LEFT JOIN gescur.emp_nomina e ON CAST(c.Profesor AS VARCHAR) = e.id_emp
              LEFT JOIN gescur.emp_nomina sp ON CAST(c.SegundoPro AS VARCHAR) = sp.id_emp
              LEFT JOIN gescur.unidad u ON c.Unidad = u.codigo
              ORDER BY c.id
          `;
      } else {
          cursos = await this.prisma.$queryRaw`
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
                  c.CupoMax,
                  c.Lugar,
                  c.Linea,
                  c.Proexterno, 
                  l.Especificacion AS Linea,
                  c.Estado,
                  est.Especificacion AS Estado,
                  c.Modalidad,
                  m.Especificacion AS Modalidad,
                  u.nombre AS Unidad,
                  e.nombre AS NombreProfesor,
                  sp.nombre AS SegundoProNombre
              FROM gescur.cursos c
              LEFT JOIN gescur.listas lp ON lp.id = c.Publico AND lp.Tipo = 1
              LEFT JOIN gescur.listas l ON l.id = c.Linea AND l.Tipo = 2
              LEFT JOIN gescur.listas m ON m.id = c.Modalidad AND m.Tipo = 3
              LEFT JOIN gescur.listas est ON est.id = c.Estado AND est.Tipo = 4
              LEFT JOIN gescur.emp_nomina e ON CAST(c.Profesor AS VARCHAR) = e.id_emp
              LEFT JOIN gescur.emp_nomina sp ON CAST(c.SegundoPro AS VARCHAR) = sp.id_emp
              LEFT JOIN gescur.unidad u ON c.Unidad = u.codigo
              WHERE c.publico = ${publico} OR c.publico = 3
              ORDER BY c.id
              
          `;
      }

      console.log(`Cursos obtenidos para usuario ${id_emp}:`, cursos);

      return cursos;
  } catch (error) {
      console.error('Error al obtener cursos:', error.message);
      throw new Error('No se pudieron obtener los cursos.');
  }
}
