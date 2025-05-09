const handleExportCurso = (cursoId: number) => {
  const curso = cursos.find((c) => c.curso.id === cursoId);
  if (!curso) return;

  const dataToExport: any[] = curso.inscripciones.map((inscripcion: any) => ({
    Nombre: inscripcion.nombre,
    Documento: inscripcion.docInscr,
    Fecha_Registro: inscripcion.fecreg,
    Nota: inscripcion.Nota ?? "No calificado",
    Curso: curso.curso.nombre,
    Profesor: curso.curso.profesor,
    Segundo_Profesor: curso.curso.segundoProfesor,
    Lugar: curso.curso.lugar,
    Horario: curso.curso.horario,
    Fecha_Inicio: curso.curso.fechaInicio,
    Fecha_Fin: curso.curso.fechaFin,
    Estado: curso.curso.estado,
  }));

  const worksheet = XLSX.utils.json_to_sheet(dataToExport);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Curso");

  XLSX.writeFile(workbook, `curso_${cursoId}.xlsx`);
};


<Button
  variant="outline"
  size="sm"
  className="ml-auto"
  onClick={() => handleExportCurso(cursoGroup.curso.id)}
>
  Exportar Excel
</Button>