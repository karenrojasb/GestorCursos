<div className="flex gap-4 items-center mb-4">
  {/* Filtro de Año */}
  <select
    value={anioSeleccionado ?? ""}
    onChange={(e) => {
      const value = e.target.value;
      setAnioSeleccionado(value === "" ? null : parseInt(value));
      if (value === "") {
        setCursosFiltrados(cursos);
      } else {
        setCursosFiltrados(cursos.filter(c => new Date(c.Fin).getFullYear() === parseInt(value)));
      }
    }}
    className="border rounded px-3 py-2 text-sm"
  >
    <option value="">Todos los años</option>
    {anios.map(anio => (
      <option key={anio} value={anio}>{anio}</option>
    ))}
  </select>

  {/* Barra de búsqueda existente */}
  <div
    className="relative flex items-center"
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}
  >
    <button onClick={() => setIsSearchActive(!isSearchActive)} className="p-2 rounded-full bg-gray-200">
      <MagnifyingGlassIcon className="h-6 w-6" />
    </button>
    {isSearchActive && (
      <input
        type="text"
        value={busqueda}
        onChange={handleBuscar}
        placeholder="Buscar curso..."
        className="ml-2 border px-2 py-1 rounded"
      />
    )}
  </div>
</div>