const fetchInscripcionesCurso = async (idCurso: number) => {
  try {
    const response = await fetch(`http://localhost:8090/api/inscripciones/curso/${idCurso}`);
    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
    const data = await response.json();
    setInscripciones(prev => ({ ...prev, [idCurso]: data }));
  } catch (error) {
    console.error(`Error al obtener inscripciones del curso ${idCurso}:`, error);
  }
};


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
      <tbody>
        {inscripciones[curso.id]?.map((inscrito) => (
          <tr key={inscrito.id} className="border-t">
            <td className="p-2 border">{inscrito.docInscr}</td>
            <td className="p-2 border">{new Date(inscrito.fecreg).toLocaleDateString()}</td>
            <td className="p-2 border">
              {inscrito.Nota !== undefined ? (
                <>
                  {inscrito.Nota} {" "}
                  {opciones.find(o => o.id === inscrito.Nota)?.Especificacion || ""}
                </>
              ) : (
                "Sin nota"
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}