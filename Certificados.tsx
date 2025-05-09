const handleDownloadExcelCompleto = () => {
  const data = inscripcionesFiltradas.map((inscripcion) => ({
    "ID Curso": inscripcion.idCur,
    "Nombre del Curso": inscripcion.NombreCurso || "Desconocido",
    Documento: inscripcion.docInscr,
    Nombre: inscripcion.nombre,
    Estado: inscripcion.Est ? "Inscrito" : "Cancelado",
    "Fecha Registro": new Date(inscripcion.fecreg).toLocaleDateString(),
    Nota: inscripcion.Nota,
    Especificacion: inscripcion.Especificacion,
    Inicio: inscripcion.Inicio,
    Fin: inscripcion.Fin,
    Horas: inscripcion.Horas,
    Lugar: inscripcion.Lugar,
    Línea: inscripcion.Linea,
    Valor: inscripcion.Valor,
    Modalidad: inscripcion.Modalidad,
    "Profesor Principal": inscripcion.NombreProfesor,
    "Segundo Profesor": inscripcion.SegundoProfe,
    "Profesor Externo": inscripcion.Proexterno,
    "Tipo de Curso": inscripcion.IdTipoCurso,
    Descripción: inscripcion.Descripcion,
    Unidad: inscripcion.Unidad,
    Público: inscripcion.Publico,
    Periodo: inscripcion.Periodo,
    "Cupo Máximo": inscripcion.CupoMax,
    "Fecha Registro (ID)": inscripcion.FechaRegistro,
    "Lunes": `${inscripcion.LunesIni} - ${inscripcion.LunesFin}`,
    "Martes": `${inscripcion.MartesIni} - ${inscripcion.MartesFin}`,
    "Miércoles": `${inscripcion.MiercolesIni} - ${inscripcion.MiercolesFin}`,
    "Jueves": `${inscripcion.JuevesIni} - ${inscripcion.JuevesFin}`,
    "Viernes": `${inscripcion.ViernesIni} - ${inscripcion.ViernesFin}`,
    "Sábado": `${inscripcion.SabadoIni} - ${inscripcion.SabadoFin}`,
    "Domingo": `${inscripcion.DomingoIni} - ${inscripcion.DomingoFin}`,
  }));

  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(data);
  XLSX.utils.book_append_sheet(workbook, worksheet, "Todas las Inscripciones");

  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  saveAs(blob, "Inscripciones_Completas.xlsx");
};



<div className="flex justify-end">
  <button
    onClick={handleDownloadExcelCompleto}
    className="flex items-center bg-blue-600 text-white px-4 py-2 mb-2 rounded-md hover:bg-blue-700 transition"
  >
    <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
    Descargar Todo
  </button>
</div>
