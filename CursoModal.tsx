async function exportarCursoAExcel(curso: Curso) {
  // Verifica si ya tienes inscripciones cargadas
  if (!inscripciones[curso.id]) {
    await fetchInscripcionesCurso(curso.id);
  }

  // Espera 100ms para asegurarse que el estado se actualice (opcional pero puede ayudar)
  await new Promise(resolve => setTimeout(resolve, 100));

  const inscritosCurso = inscripciones[curso.id] || [];

  const datosCurso = [
    {
      ID: curso.id,
      Nombre: curso.NombreCurso,
      Valor: curso.Valor,
      Público: curso.Publico,
      Periodo: curso.Periodo,
      CupoMax: curso.CupoMax,
      Inicio: curso.Inicio,
      Fin: curso.Fin,
      Horas: curso.Horas,
      Lugar: curso.Lugar,
      Estado: curso.EstadoNombre,
      Línea: curso.LineaNombre,
      Modalidad: curso.ModalidadNombre,
      Unidad: curso.Unidad,
      Profesor: curso.NombreProfesor,
      SegundoProfesor: curso.SegundoProNombre,
      ProfesorExterno: curso.Proexterno,
      TipoCurso: curso.IdTipoCurso,
      InicioInscripción: curso.InicioInscr,
      FinInscripción: curso.FinInscr,
      Descripción: curso.Descripcion,
    },
  ];
  const hojaCurso = XLSX.utils.json_to_sheet(datosCurso);

  const datosInscritos = inscritosCurso.map((inscrito) => ({
    Documento: inscrito.docInscr,
    Nombre: inscrito.nombreInscrito,
    FechaInscripción: inscrito.fecreg,
    Nota: inscrito.nota,
    Especificación: inscrito.especificacion,
    RegistradoPor: inscrito.nombreRegistrador,
    FechaRegistro: inscrito.fechaRegistro,
  }));
  const hojaInscritos = XLSX.utils.json_to_sheet(datosInscritos);

  const libro = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(libro, hojaCurso, "Datos del Curso");
  XLSX.utils.book_append_sheet(libro, hojaInscritos, "Inscritos y Notas");

  const excelBuffer = XLSX.write(libro, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(blob, `Reporte_Curso_${curso.NombreCurso.replace(/\s+/g, "_")}.xlsx`);
}