{expandedCursoId === curso.id && (
  <div className="mt-4 border-t pt-4">
    <h3 className="text-lg font-semibold text-[#990000] mb-2">Inscritos</h3>
    <table className="w-full text-sm border">
      <thead className="bg-gray-100">
        <tr>
          <th className="text-left p-2 border">Documento</th>
          <th className="text-left p-2 border">Fecha Registro</th>
          <th className="text-left p-2 border">Nota</th>
        </tr>
      </thead>
      {/* Renderiza <tbody> solo si hay inscripciones */}
      {inscripciones[curso.id] && (
        <tbody>
          {inscripciones[curso.id].map((inscrito) => (
            <tr key={inscrito.id} className="border-t">
              <td className="p-2 border">{inscrito.docInscr}</td>
              <td className="p-2 border">{new Date(inscrito.fecreg).toLocaleDateString()}</td>
              <td className="p-2 border">
                {inscrito.Nota !== undefined ? (
                  <>
                    {inscrito.Nota}{" "}
                    {opciones.find((o) => o.id === inscrito.Nota)?.Especificacion || ""}
                  </>
                ) : (
                  "Sin nota"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      )}
    </table>
  </div>
)}