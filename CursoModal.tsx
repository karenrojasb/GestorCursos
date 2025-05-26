    <select
    value={yearSeleccionado ?? ""}
    onChange={(e) => {
      const value = e.target.value;
      setYearSeleccionado(value === "" ? null : parseInt(value));
      if (value === "") {
        setCursosFiltrados(cursos);
      } else {
        setCursosFiltrados(cursos.filter(c => new Date(c.Fin).getFullYear() === parseInt(value)));
      }
    }}
    className="border rounded px-3 py-2 text-sm"
  >
    <option value="">Todos los años</option>
    {year.map(year => (
      <option key={year} value={year}>{year}</option>
    ))}
  </select>
