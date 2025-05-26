{cursosFiltrados.map((curso) => (
  <div key={curso.id} className="border p-4 mb-4 bg-white rounded shadow-md">
    <h2 className="text-xl font-semibold">{curso.NombreCurso}</h2>
    
    <div className="flex gap-4 text-sm text-gray-700 mt-2">
      <div>
        <strong>Inicio:</strong> {curso.Inicio}
      </div>
      <div>
        <strong>Estado:</strong> {curso.EstadoNombre}
      </div>
    </div>

    {/* Otros detalles que ya tienes */}
  </div>
))}