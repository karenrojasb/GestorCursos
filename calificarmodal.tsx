<select
  className="w-full border rounded px-3 py-2"
  value={
    opciones.find((op) => op.Especificacion === Especificacion)?.id ?? ""
  }
  onChange={(e) => setNotaSeleccionada(Number(e.target.value))}
>
  <option value="">-- Selecciona --</option>
  {opciones.map((op) => (
    <option key={op.id} value={op.id}>
      {op.Especificacion}
    </option>
  ))}
</select>