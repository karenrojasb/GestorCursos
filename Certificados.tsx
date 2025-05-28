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

  return dias.filter(d => d.ini && d.fin);
};


<td className="px-3 py-2 border text-left bg-gray-50 rounded">
  <div className="space-y-1 text-sm text-gray-700">
    {formatearHorario(curso).map((h, index) => (
      <div key={index} className="flex items-center gap-2">
        <span className="font-medium text-blue-700">{h.dia}:</span>
        <span className="text-gray-800">{h.ini} - {h.fin}</span>
      </div>
    ))}
  </div>
</td>