import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const exportarCursoAExcel = (curso: Curso) => {
  if (!curso.Inscritos || curso.Inscritos === "[]") {
    alert("Este curso no tiene inscritos para exportar.");
    return;
  }

  const inscritos: Inscrito[] = JSON.parse(curso.Inscritos);

  const data = inscritos.map((inscrito) => {
    const nota = inscrito.Notas?.[0] || {};
    return {
      "ID Inscrito": inscrito.id,
      "Documento": inscrito.docInscr,
      "Estado": inscrito.est ? "Activo" : "Inactivo",
      "Fecha de Inscripción": new Date(inscrito.fecreg).toLocaleDateString(),
      "ID Calificador": nota.idRegistro ?? "—",
      "Fecha de Calificación": nota.FechaRegistro ? new Date(nota.FechaRegistro).toLocaleDateString() : "—",
      "Nota": nota.Nota ?? "-"
    };
  });

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Inscritos");

  const nombreArchivo = `Curso_${curso.NombreCurso.replace(/\s+/g, "_")}.xlsx`;
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const dataBlob = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(dataBlob, nombreArchivo);
};