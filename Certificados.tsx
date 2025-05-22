{(() => {
  let inscritos: Inscrito[] = [];

  try {
    if (curso.Inscritos) {
      const parsed = JSON.parse(curso.Inscritos);
      if (Array.isArray(parsed)) {
        inscritos = parsed;
      }
    }
  } catch (e) {
    console.error("Error al parsear los inscritos del curso:", e);
  }

  return inscritos.length > 0 ? (
    <div className="mt-2 w-full">
      <table className="min-w-full text-[0.8rem] table-fixed border border-gray-300 bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-[#990000] text-white">
            <th colSpan={8} className="text-center py-2 text-base font-semibold border-b">
              Inscritos en este curso
            </th>
          </tr>
          <tr className="bg-gray-100 text-[#990000] font-medium">
            <th className="px-3 py-1 border">ID</th>
            <th className="px-3 py-1 border">ID Curso</th>
            <th className="px-3 py-1 border">Documento</th>
            <th className="px-3 py-1 border">Estado</th>
            <th className="px-3 py-1 border">Fecha de Inscripción</th>
            <th className="px-3 py-1 border">Calificador</th>
            <th className="px-3 py-1 border">Fecha de Calificación</th>
            <th className="px-3 py-1 border">Nota</th>
          </tr>
        </thead>
        <tbody>
          {inscritos.map((inscrito) => {
            const nota = inscrito.Notas?.[0] || {};
            return (
              <tr key={inscrito.id} className="text-gray-700 text-center">
                <td className="px-3 py-1 border">{inscrito.id}</td>
                <td className="px-3 py-1 border">{inscrito.idCur}</td>
                <td className="px-3 py-1 border">{inscrito.docInscr}</td>
                <td className="px-3 py-1 border">{inscrito.est ? "Activo" : "Inactivo"}</td>
                <td className="px-3 py-1 border">{new Date(inscrito.fecreg).toLocaleDateString()}</td>
                <td className="px-3 py-1 border">{nota.NombreRegistro ?? "—"}</td>
                <td className="px-3 py-1 border">
                  {nota.FechaRegistro
                    ? new Date(nota.FechaRegistro).toLocaleDateString()
                    : "—"}
                </td>
                <td className="px-3 py-1 border">
                  <select
                    value={nota.Nota || ""}
                    onChange={(e) =>
                      handleChangeEspecificacion(inscrito.id, parseInt(e.target.value), curso.id)
                    }
                    className="border p-1 rounded"
                  >
                    <option value="">Seleccionar</option>
                    {opciones.map((op) => (
                      <option key={op.id} value={op.id}>
                        {op.Especificacion}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  ) : null;
})()}