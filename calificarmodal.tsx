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