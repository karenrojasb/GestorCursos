{inscripciones[curso.id] && inscripciones[curso.id].length > 0 ? (
  <div className="mt-2">
    <h4 className="font-semibold mb-2 text-[#990000]">Inscritos:</h4>
    <ul className="list-disc ml-5 space-y-1 text-sm">
      {inscripciones[curso.id].map((inscrito, idx) => (
        <li key={idx}>
          <strong>Documento:</strong> {inscrito.docInscr} | <strong>Fecha:</strong> {new Date(inscrito.fecreg).toLocaleDateString()}
        </li>
      ))}
    </ul>
  </div>
) : (
  <p className="text-gray-600 italic mt-2">No hay inscritos para este curso.</p>
)}