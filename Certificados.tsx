const exportarCursoAExcel = (cursoId: number) => {
  const cursoInscripciones = groupedInscripciones[cursoId];
  if (!cursoInscripciones || cursoInscripciones.length === 0) return;

  // Curso base
  const cursoInfo = cursoInscripciones[0];

  // Información general del curso
  const datosCurso = [{
    ID: cursoInfo.idCur,
    Nombre: cursoInfo.NombreCurso,
    Valor: cursoInfo.Valor,
    Público: cursoInfo.Publico,
    Periodo: cursoInfo.Periodo,
    Lugar: cursoInfo.Lugar,
    Inicio: cursoInfo.Inicio,
    Fin: cursoInfo.Fin,
    Horas: cursoInfo.Horas,
    Modalidad: cursoInfo.Modalidad,
    Unidad: cursoInfo.Unidad,
    Profesor: cursoInfo.NombreProfesor,
    SegundoProfesor: cursoInfo.SegundoProfe,
    ProfeExterno: cursoInfo.Proexterno,
  }];

  // Inscritos
  const inscritos = cursoInscripciones.map((ins) => ({
    Documento: ins.docInscr,
    Nombre: ins.nombre,
    Estado: ins.Est,
    Nota: ins.Nota,
    FechaInscripción: ins.fecreg,
    Especificación: ins.Especificacion,
  }));

  const wb = XLSX.utils.book_new();
  const wsCurso = XLSX.utils.json_to_sheet(datosCurso);
  const wsInscritos = XLSX.utils.json_to_sheet(inscritos);

  XLSX.utils.book_append_sheet(wb, wsCurso, "Curso");
  XLSX.utils.book_append_sheet(wb, wsInscritos, "Inscritos");

  const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  saveAs(new Blob([wbout], { type: "application/octet-stream" }), `Curso_${cursoId}.xlsx`);
};





<button
  onClick={() => exportarCursoAExcel(Number(cursoId))}
  className="flex items-center bg-green-600 text-white px-3 py-1.5 rounded-md hover:bg-green-700 transition"
>
  <ArrowDownTrayIcon className="h-5 w-5 mr-1" />
  Descargar
</button>