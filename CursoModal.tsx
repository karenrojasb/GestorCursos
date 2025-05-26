 <div className="w-full flex justify-between text-[#990000] font-semibold px-4 py-2 rounded-t-lg bg-gray-100">
  <span className="w-2/5 text-left">Nombre del curso</span>
  <span className="w-1/5 text-center">Inicio Curso</span>
  <span className="w-1/5 text-center">Estado</span>
  <span className="w-1/5 text-center">Acciones</span>
</div>

<div className="flex-1 overflow-y-auto max-h-[75vh] space-y-3">
           {cursosFiltrados.length > 0 ? (
            cursosFiltrados.map((curso, index) => (
              <div key={curso.id} className="border-b py-2">
                <div className="grid grid-cols-4 items-center ">
                 <span className="w-2/5 text-left">{curso.NombreCurso}</span>
          <span className="w-1/5 text-center">{curso.Inicio || "dd/mm/aaaa"}</span>
          <span className="w-1/5 text-center">{curso.EstadoNombre}</span>

                  {/* BOTONES */}
                 <span className="w-1/5">
                  {/* BOTÓN PARA VER MÁS */}
                  <div className="flex space-x-2">
                    <button 
                    onClick={() => handleVerMas(curso.id)} 
                    className="bg-[#990000] hover:bg-red-700 text-white px-4 py-2 rounded transition-transform hover:scale-110 active:scale-95">
                      {expandedCursoId === curso.id ? "Ver menos" : "Ver más"}
                    </button>
                   
                    {/* BOTÓN PARA EDITAR */}
                    <button 
                   onClick={() => handleEditarCurso(curso)}
                    className="bg-[#990000] hover:bg-red-700 text-white p-2 rounded transition-transform hover:scale-110 active:scale-95"
                    title="Editar">
                      <PencilSquareIcon className="h-5 w-5" />
                    </button>
                    
                    
                    {/* BOTÓN PARA ELIMINAR */}
                     
                     <button 
                     onClick={() => handleDeleteCourse(curso.id)} 
                     className="bg-[#990000] hover:bg-red-700 text-white p-2 rounded transition-transform hover:scale-110 active:scale-95"
                     title="Eliminar">                    
                       <TrashIcon className="h-5 w-5"/>
                     </button>

                     <button 
                     onClick={() => exportarCursoAExcel(curso)} 
                     className="flex items-center hover:scale-110 active:scale-95 bg-green-600 text-white px-2 py-1 rounded-md hover:bg-green-700 transition"
      
                     title="Descargar">                    
                
            <ArrowDownTrayIcon className="font-semibold h-5 w-5"/>
                     </button>
                   </div>
