  async getCoursesTeacher(idProfesor: number) {
    return this.prisma.$queryRawUnsafe<
      Array<{
        id: number;
        idRegistro: number | null;
        FechaRegistro: Date | null;
        idCur: number;
        NombreCurso: string;
        Publico: number;
        Profesor: number;
        SegundoPro: number;
        Valor: number;
        Horas: number;
        Lugar: string;
        Inicio: Date;
        Fin: Date;
        LunesIni: string;
        LunesFin: string;
        MartesIni: string;
        MartesFin: string;
        MiercolesIni: string;
        MiercolesFin: string;
        JuevesIni: string;
        JuevesFin: string;
        ViernesIni: string;
        ViernesFin: string;
        SabadoIni: string;
        SabadoFin: string;
        DomingoIni: string;
        DomingoFin: string;
        Periodo: number;
        Linea: number;
        Proexterno: string;
        Estado: string;
        Modalidad: number;
        Unidad: number;
        docInscr: string;
        nombre: string | null;
        fecreg: Date;
        rol: string;
        CupoMax: number | null;
        Nota: number | null;
        Especificacion: string | null;
        InscritoNumerico: number | null;
        SegundoProfe: string | null;
        IdTipoCurso: string;
        NombreProfesor: string | null;
        Descripcion: string;
      }>
    >(
      `SELECT 
        i.id,
        i.idCur,
        c.NombreCurso,
        lp.Especificacion AS Publico,
        c.Profesor,
        c.SegundoPro,
        c.Valor,
        c.Horas,
        c.Lugar,
        c.Inicio,
        c.Fin,
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
        c.Periodo,
        ll.Especificacion AS Linea,
        c.Proexterno,
        c.Estado,
        est.Especificacion AS Est,
        m.Especificacion AS Modalidad,
        u.nombre AS Unidad,
        i.docInscr,
        e.nombre,
        i.fecreg,
        c.CupoMax,
        sp.nombre AS SegundoProfe,
        tc.Especificacion AS IdTipoCurso,
        p.nombre AS NombreProfesor,
        TRY_CAST(i.docInscr AS INT) AS InscritoNumerico,
        n.idRegistro,
        n.FechaRegistro,
        n.Nota,
        l.Especificacion,
        c.Descripcion,
        CASE 
          WHEN c.Profesor = ${idProfesor} THEN 'Titular'
          WHEN c.SegundoPro = ${idProfesor} THEN 'Segundo'
          ELSE 'Otro'
        END AS rol
      FROM gescur.Cursos c
      LEFT JOIN gescur.Inscripciones i ON i.idCur = c.id
      LEFT JOIN gescur.emp_nomina e ON i.docInscr = e.id_emp
      LEFT JOIN gescur.emp_nomina p ON CAST(c.Profesor AS VARCHAR) = p.id_emp
      LEFT JOIN gescur.emp_nomina sp ON CAST(c.SegundoPro AS VARCHAR) = sp.id_emp
      OUTER APPLY (
        SELECT TOP 1 
          n.Nota,
          n.idRegistro,
          n.FechaRegistro
        FROM gescur.Notas n 
        WHERE n.idInscrito = TRY_CAST(i.docInscr AS INT)
          AND n.IdCurso = c.id
        ORDER BY n.id ASC
      ) n
      LEFT JOIN gescur.Listas l ON l.id = n.Nota
      LEFT JOIN gescur.listas lp ON lp.id = c.Publico AND lp.Tipo = 1
      LEFT JOIN gescur.listas ll ON ll.id = c.Linea AND ll.Tipo = 2
      LEFT JOIN gescur.listas m ON m.id = c.Modalidad AND m.Tipo = 3
      LEFT JOIN gescur.listas est ON est.id = c.Estado AND est.Tipo = 4
      LEFT JOIN gescur.listas tc ON tc.id = c.IdTipoCurso AND tc.Tipo = 8
      LEFT JOIN gescur.unidad u ON c.Unidad = u.codigo
      WHERE (c.Profesor = ${idProfesor} OR c.SegundoPro = ${idProfesor})
        AND i.est = 1`
    );
  }
