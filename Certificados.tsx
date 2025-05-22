<tr key={inscrito.id} className="text-gray-700 text-center">
  <td className="px-3 py-1 border">{inscrito.id}</td>
  <td className="px-3 py-1 border">{inscrito.idCur}</td>
  <td className="px-3 py-1 border">{inscrito.docInscr}</td>
  <td className="px-3 py-1 border">{inscrito.est ? "Activo" : "Inactivo"}</td>
  <td className="px-3 py-1 border">
    {inscrito.fecreg ? new Date(inscrito.fecreg).toLocaleDateString() : "—"}
  </td>
  <td className="px-3 py-1 border">
    {inscrito.Notas?.[0]?.NombreRegistro ?? "—"}
  </td>
  <td className="px-3 py-1 border">
    {inscrito.Notas?.[0]?.FechaRegistro
      ? new Date(inscrito.Notas[0].FechaRegistro).toLocaleDateString()
      : "—"}
  </td>
  <td className="px-3 py-1 border">
    <select
      value={inscrito.Notas?.[0]?.Nota || ""}
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