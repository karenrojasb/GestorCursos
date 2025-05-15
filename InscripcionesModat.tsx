<select
  className="w-full border rounded px-3 py-2"
  value={notaSeleccionada ?? ""}
  onChange={(e) => setNotaSeleccionada(Number(e.target.value))}
>
  {notaSeleccionada === null && (
    <option value="">-- Selecciona --</option>
  )}
  {opciones.map((op) => (
    <option key={op.id} value={op.id}>
      {op.Especificacion}
    </option>
  ))}
</select>

<p className="text-left mb-2">
  <strong>Nota actual:</strong> {especificacionNota || "Sin especificación"}
</p>