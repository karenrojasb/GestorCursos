<select
  className="border rounded px-2 py-1 text-sm bg-white"
  value={insc.Especificacion || ""}
  onChange={(e) => handleChangeEspecificacion(insc.id, e.target.value)}
>
  <option value="">-- Selecciona --</option>
  {opciones.map((opcion) => (
    <option key={opcion.id} value={opcion.id}>
      {opcion.Especificacion}
    </option>
  ))}
</select>