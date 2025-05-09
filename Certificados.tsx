import * as XLSX from 'xlsx';

const exportarCursoConInscritos = (curso: any, inscritos: any[]) => {
  // Hoja 1: Información del curso
  const hojaCurso = XLSX.utils.json_to_sheet([{
    Nombre: curso.nombre,
    Profesor: curso.profesor,
    Lugar: curso.lugar,
    Horario: curso.horario,
    Fechas: `${curso.fechaInicio} - ${curso.fechaFin}`,
    // ...otros campos
  }]);

  // Hoja 2: Lista de inscritos
  const hojaInscritos = XLSX.utils.json_to_sheet(
    inscritos.map(ins => ({
      Documento: ins.docInscr,
      Nombre: ins.nombre,
      FechaRegistro: ins.fecreg,
      Nota: ins.nota,
      // ...otros campos
    }))
  );

  // Crear libro y añadir ambas hojas
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, hojaCurso, 'Curso');
  XLSX.utils.book_append_sheet(workbook, hojaInscritos, 'Inscritos');

  // Exportar
  XLSX.writeFile(workbook, `Curso_${curso.nombre}.xlsx`);
};