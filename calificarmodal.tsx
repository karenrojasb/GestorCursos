<div className="mb-4">
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Selecciona una calificación:
  </label>

  <select
    className="w-full border rounded px-3 py-2"
    value={notaSeleccionada ?? ""}
    onChange={(e) => setNotaSeleccionada(Number(e.target.value))}
  >
    <option value="">-- Selecciona --</option>
    {opciones.map((op) => (
      <option key={op.id} value={op.id}>
        {op.Especificacion}
      </option>
    ))}
  </select>

  {/* Mostrar la especificación seleccionada */}
  {especificacionNota && (
    <p className="mt-2 text-sm text-gray-600 italic">
      <strong>Descripción:</strong> {especificacionNota}
    </p>
  )}
</div>