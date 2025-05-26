<div className="flex flex-col gap-1 w-52">
  <span className="text-sm font-semibold text-gray-600">Año</span>
  <select
    value={yearSeleccionado ?? ""}
    onChange={(e) => {
      const valor = e.target.value;
      const año = parseInt(valor);
      setYearSeleccionado(año);

      const cursosFiltradosPorAño = cursos.filter(
        (curso) => new Date(curso.Fin).getFullYear() === año
      );
      setCursosFiltrados(cursosFiltradosPorAño);
    }}
    className="bg-white border border-gray-300 rounded-md px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
  >
    {year.map((año) => (
      <option key={año} value={año}>
        {año}
      </option>
    ))}
  </select>
</div>