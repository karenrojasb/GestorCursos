[Nest] 20972  - 21/05/2025, 3:13:22 p. m.   ERROR [ExceptionsHandler] PrismaClientKnownRequestError: 
Invalid `prisma.$queryRawUnsafe()` invocation:


Raw query failed. Code: `248`. Message: `The conversion of the varchar value '88040561930 ' overflowed an int column.`
    at Bn.handleRequestError (C:\Users\desarrollador5\Documents\gestor_cursos\node_modules\@prisma\client\runtime\library.js:121:7362)
    at Bn.handleAndLogRequestError (C:\Users\desarrollador5\Documents\gestor_cursos\node_modules\@prisma\client\runtime\library.js:121:6686)
    at Bn.request (C:\Users\desarrollador5\Documents\gestor_cursos\node_modules\@prisma\client\runtime\library.js:121:6393)
    at async l (C:\Users\desarrollador5\Documents\gestor_cursos\node_modules\@prisma\client\runtime\library.js:130:9645)
    at async C:\Users\desarrollador5\Documents\gestor_cursos\node_modules\@nestjs\core\router\router-execution-context.js:46:28
    at async C:\Users\desarrollador5\Documents\gestor_cursos\node_modules\@nestjs\core\router\router-proxy.js:9:17 {
  code: 'P2010',
  clientVersion: '6.8.2',
  meta: {
    code: '248',
    message: "The conversion of the varchar value '88040561930 ' overflowed an int column."
  }
}
(
  SELECT 
    i.id,
    i.idCur,
    i.docInscr,
    i.est,
    i.fecreg,
    en.nombre AS NombreInscrito,  -- Nombre del inscrito
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
  LEFT JOIN gescur.emp_nomina en ON en.id_emp = i.docInscr  -- Join con emp_nomina
  WHERE i.idCur = c.id AND i.est = 1
  FOR JSON PATH
) AS Inscritos
