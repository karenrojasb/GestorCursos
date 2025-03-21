import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { ArrowDownTrayIcon } from "@heroicons/react/24/solid"; // Ícono de descarga

// FUNCIÓN PARA DESCARGAR SOLO UN CURSO
const handleDownloadExcelByCurso = (cursoId: number) => {
  // Filtrar las inscripciones solo de ese curso
  const datosCurso = inscripcionesFiltradas.filter(
    (inscripcion) => (inscripcion.idCur || inscripcion.Cursos?.id || inscripcion.curso?.id) === cursoId
  );

  if (datosCurso.length === 0) {
    alert("No hay inscripciones en este curso.");
    return;
  }

  // Formatear los datos
  const data = datosCurso.map((inscripcion) => ({
    "ID Curso": inscripcion.idCur || inscripcion.Cursos?.id || inscripcion.curso?.id,
    "Nombre del Curso": inscripcion.Cursos?.NombreCurso || inscripcion.curso?.NombreCurso || "Desconocido",
    "Documento": inscripcion.docInscr,
    "Nombre": inscripcion.nombre,
    "Estado": inscripcion.est === 1 ? "Inscrito" : "Cancelado",
    "Fecha Registro": new Date(inscripcion.fecreg).toLocaleDateString(),
  }));

  // Crear libro de Excel
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(data);
  XLSX.utils.book_append_sheet(workbook, worksheet, "Inscripciones");

  // Generar archivo y descargarlo
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
  saveAs(blob, `Inscripciones_Curso_${cursoId}.xlsx`);
};