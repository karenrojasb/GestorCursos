<select
  value={inscrito.Notas?.[0]?.Nota ?? ""}
  onChange={(e) =>
    handleChangeEspecificacion(
      inscrito.id,
      Number(e.target.value),
      inscrito.Notas?.[0]?.idRegistro,
      curso.id,
      inscrito.docInscr.toString()
    )
  }
>
  <option value="">Selecciona una opción</option>
  {opciones.map((opcion) => (
    <option key={opcion.id} value={opcion.id}>
      {opcion.Especificacion}
    </option>
  ))}
</select>