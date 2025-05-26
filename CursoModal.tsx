{cursosFiltrados.map((curso) => (
  <div key={curso.id} className="mb-4 border rounded shadow p-4 bg-white">
    <div className="flex justify-between items-center">
      <h3 className="font-bold">{curso.NombreCurso}</h3>
      <button onClick={() => handleVerMas(curso.id)} className="text-blue-500 underline">
        {expandedCursoId === curso.id ? "Ver menos" : "Ver más"}
      </button>
    </div>

    {/* Detalle expandido debajo */}
    {expandedCursoId === curso.id && (
      <div className="mt-4 border-t pt-4">
        <p><strong>Profesor:</strong> {curso.NombreProfesor}</p>
        <p><strong>Fechas:</strong> {curso.Inicio} - {curso.Fin}</p>
        <p><strong>Inscritos:</strong> {inscripciones[curso.id]?.length ?? 0}</p>
        {/* Puedes mapear inscripciones aquí también si quieres */}
      </div>
    )}
  </div>
))}