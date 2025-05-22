<td>
  <select
    value={inscrito.Notas?.[0]?.Nota || ""}
    onChange={(e) =>
      handleChangeEspecificacion(inscrito.id, parseInt(e.target.value))
    }
    className="border border-gray-300 rounded px-2 py-1"
  >
    <option value="">Seleccione una</option>
    {opciones.map((op) => (
      <option key={op.id} value={op.id}>
        {op.Especificacion}
      </option>
    ))}
  </select>
</td>