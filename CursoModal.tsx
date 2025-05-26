<div className="bg-white rounded-lg p-6 shadow-md max-w-6xl w-full h-[90vh] overflow-hidden flex flex-col relative">
  {/* Botón X en esquina superior derecha */}
  <button
    onClick={onClose}
    className="absolute top-4 right-4 text-gray-500 hover:text-[#990000] transition-transform duration-300 transform hover:rotate-90 hover:scale-110"
  >
    <XMarkIcon className="h-6 w-6" />
  </button>

  {/* DESPLEGABLE DE AÑOS */}
  <div className="flex flex-col gap-1 w-52 mb-4">
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

  {/* Aquí sigue el resto de tu contenido */}
  {/* ... */}
</div>