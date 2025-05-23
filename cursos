<select
  className="border rounded px-2 py-1 text-sm bg-white"
    value={inscrito.Notas?.[0]?.Nota ?? ""}
  onChange={(e) =>
    handleChangeEspecificacion(
      inscrito.docInscr,                   
      Number(e.target.value),
      nota?.id,                      
      inscrito.idCur,                
                  
    )
  }
>
  <option value="">-- Selecciona --</option>
  {opciones.map((opcion) => (
    <option key={opcion.id} value={opcion.id}>
      {opcion.Especificacion}
    </option>
  ))}
</select>
