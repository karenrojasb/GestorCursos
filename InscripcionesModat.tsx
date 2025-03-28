const formatearHorario = (curso: Curso) => {
  const dias = [
    { dia: "Lunes", ini: curso.LunesIni, fin: curso.LunesFin },
    { dia: "Martes", ini: curso.MartesIni, fin: curso.MartesFin },
    { dia: "Miércoles", ini: curso.MiercolesIni, fin: curso.MiercolesFin },
    { dia: "Jueves", ini: curso.JuevesIni, fin: curso.JuevesFin },
    { dia: "Viernes", ini: curso.ViernesIni, fin: curso.ViernesFin },
    { dia: "Sábado", ini: curso.SabadoIni, fin: curso.SabadoFin },
    { dia: "Domingo", ini: curso.DomingoIni, fin: curso.DomingoFin },
  ];

  return dias
    .filter(d => d.ini && d.fin) // Mostrar solo días que tengan horario
    .map(d => `${d.dia} ${d.ini} - ${d.fin}`)
    .join(" | "); // Puedes separar por " | " o salto de línea
};