
{/* MODAL EDICIÓN DE CURSO */}
{editandoCurso && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="relative bg-white p-6 rounded-lg shadow-lg max-h-[80vh] overflow-y-auto w-full max-w-md">
      
      {/* BOTÓN PARA CERRAR */}
      <button className="absolute top-4 right-4 text-gray-500 hover:text-[#990000] transition-transform duration-300 hover:rotate-90" 
        onClick={() => setEditandoCurso(null)}>
        <XMarkIcon className="w-6 h-6" />
      </button>

      <h2 className="text-lg font-bold mb-4">Editar Curso</h2>

      {/* MENSAJE DE ÉXITO */}
      {mensajeExito && (
        <div className="bg-green-100 text-green-800 p-2 rounded text-center mb-4">
          {mensajeExito}
        </div>
      )}

      {/* FORMULARIO DE EDICIÓN */}
      {Object.keys(editandoCurso).map((key) => (
        key !== "id" && (
          <div key={key} className="mt-2">
            <label className="block text-sm font-medium">{key}</label>
            <input
              type="text"
              name={key}
              value={editandoCurso ? (editandoCurso as any)[key] ?? "" : ""}
              onChange={handleChange}
              className="border p-2 w-full rounded"
            />
          </div>
        )
      ))}

      {/* BOTONES */}
      <div className="mt-4 flex space-x-2">
        <button onClick={handleGuardarEdicion} className="bg-[#990000] text-white px-4 py-2 rounded">Guardar</button>
        <button onClick={() => setEditandoCurso(null)} className="bg-gray-700 text-white px-4 py-2 rounded">Cancelar</button>
      </div>
      
    </div>
  </div>
)}