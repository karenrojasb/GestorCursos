import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const exportarCursoAExcel = (curso: Curso) => {
  const dataCurso = [
    {
      ID: curso.id,
      NombreCurso: curso.NombreCurso,
      Valor: curso.Valor,
      Publico: curso.Publico,
      Periodo: curso.Periodo,
      CupoMax: curso.CupoMax,
      Inicio: curso.Inicio,
      Fin: curso.Fin,
      Horas: curso.Horas,
      Lugar: curso.Lugar,
      Linea: curso.Linea,
      Estado: curso.Estado,
      Modalidad: curso.Modalidad,
      Profesor: curso.NombreProfesor || curso.Profesor,
      SegundoProfesor: curso.SegundoPro,
      ProfesorExterno: curso.Proexterno,
      Unidad: curso.Unidad,
      TipoCurso: curso.IdTipoCurso,
      InicioInscripciones: curso.InicioInscr,
      FinInscripciones: curso.FinInscr,
      Descripcion: curso.Descripcion,
    },
  ];

  const inscritos: Inscrito[] = curso.Inscritos ? JSON.parse(curso.Inscritos) : [];

  const dataInscritos = inscritos.map(inscrito => {
    const nota = inscrito.Notas?.[0] || {};
    return {
      ID: inscrito.id,
      Documento: inscrito.docInscr,
      Estado: inscrito.est ? "Activo" : "Inactivo",
      FechaInscripcion: new Date(inscrito.fecreg).toLocaleDateString(),
      Calificador: nota.idRegistro || "",
      FechaCalificación: nota.FechaRegistro ? new Date(nota.FechaRegistro).toLocaleDateString() : "",
      Nota: nota.Nota ?? "",
    };
  });

  const workbook = XLSX.utils.book_new();

  const sheetCurso = XLSX.utils.json_to_sheet(dataCurso);
  XLSX.utils.book_append_sheet(workbook, sheetCurso, "Curso");

  const sheetInscritos = XLSX.utils.json_to_sheet(dataInscritos);
  XLSX.utils.book_append_sheet(workbook, sheetInscritos, "Inscritos");

  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], { type: "application/octet-stream" });

  saveAs(blob, `Curso_${curso.NombreCurso.replace(/\s+/g, "_")}.xlsx`);
};