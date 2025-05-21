import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function exportarCursoAExcel(curso: Curso) {
  const inscritos: Inscrito[] = curso.Inscritos ? JSON.parse(curso.Inscritos) : [];

  // 🧾 Hoja 1: Datos del curso
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
      Estado: curso.Estado,
      Modalidad: curso.Modalidad,
      Unidad: curso.Unidad,
      Profesor: curso.NombreProfesor,
      SegundoProfesor: curso.SegundoPro,
      ProfesorExterno: curso.Proexterno,
      TipoCurso: curso.IdTipoCurso,
      InicioInscripción: curso.InicioInscr,
      FinInscripción: curso.FinInscr,
      Descripción: curso.Descripcion,
    },
  ];
  const hojaCurso = XLSX.utils.json_to_sheet(datosCurso);

  // 🧾 Hoja 2: Inscritos
  const datosInscritos = inscritos.map((inscrito) => {
    const nota = inscrito.Notas?.[0] ?? {};
    return {
      ID: inscrito.id,
      Documento: inscrito.docInscr,
      Estado: inscrito.est ? "Activo" : "Inactivo",
      FechaInscripción: new Date(inscrito.fecreg).toLocaleDateString(),
      Calificador: nota.idRegistro ?? "—",
      FechaCalificación: nota.FechaRegistro
        ? new Date(nota.FechaRegistro).toLocaleDateString()
        : "—",
      Nota: nota.Nota ?? "-",
    };
  });

  const hojaInscritos = XLSX.utils.json_to_sheet(datosInscritos);

  // 📄 Libro y descarga
  const libro = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(libro, hojaCurso, "Datos del Curso");
  XLSX.utils.book_append_sheet(libro, hojaInscritos, "Inscritos");

  const excelBuffer = XLSX.write(libro, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(blob, `Curso_${curso.NombreCurso.replace(/\s+/g, "_")}.xlsx`);
}