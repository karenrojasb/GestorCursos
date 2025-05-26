<div className="w-full text-[#990000] font-semibold px-4 py-2 rounded-t-lg bg-gray-100">
  <div className="grid grid-cols-3 gap-4">
    <span className="text-center">Inicio Curso</span>
    <span className="text-center">Estado</span>
    <span className="text-center">Acciones</span>
  </div>
</div>

<div className="flex-1 overflow-y-auto max-h-[75vh] space-y-3">
  {cursosFiltrados.length > 0 ? (
    cursosFiltrados.map((curso) => (
      <div key={curso.id} className="border-b py-2 px-4">
        
        {/* Nombre del curso como fila separada */}
        <div className="text-[#990000] font-semibold mb-1">{curso.NombreCurso}</div>

        {/* Datos en columnas */}
        <div className="grid grid-cols-3 items-center gap-4">
          <span className="text-center">{curso.Inicio || "dd/mm/aaaa"}</span>
          <span className="text-center">{curso.EstadoNombre}</span>

          <div className="flex justify-center space-x-2">
            {/* Botón Ver Más */}
            <button 
              onClick={() => handleVerMas(curso.id)} 
              className="bg-[#990000] hover:bg-red-700 text-white px-4 py-2 rounded transition-transform hover:scale-110 active:scale-95">
              {expandedCursoId === curso.id ? "Ver menos" : "Ver más"}
            </button>

            {/* Botón Editar */}
            <button 
              onClick={() => handleEditarCurso(curso)}
              className="bg-[#990000] hover:bg-red-700 text-white p-2 rounded transition-transform hover:scale-110 active:scale-95"
              title="Editar">
              <PencilSquareIcon className="h-5 w-5" />
            </button>

            {/* Botón Eliminar */}
            <button 
              onClick={() => handleDeleteCourse(curso.id)} 
              className="bg-[#990000] hover:bg-red-700 text-white p-2 rounded transition-transform hover:scale-110 active:scale-95"
              title="Eliminar">
              <TrashIcon className="h-5 w-5"/>
            </button>

            {/* Botón Exportar */}
            <button 
              onClick={() => exportarCursoAExcel(curso)} 
              className="flex items-center hover:scale-110 active:scale-95 bg-green-600 text-white px-2 py-1 rounded-md hover:bg-green-700 transition"
              title="Descargar">
              <ArrowDownTrayIcon className="font-semibold h-5 w-5"/>
            </button>
          </div>
        </div>
      </div>
    ))
  ) : (
    <p className="text-center text-gray-500 mt-4">No hay cursos disponibles.</p>
  )}
</div>