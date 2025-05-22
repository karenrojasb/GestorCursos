{expandedCursoId === curso.id && (
  <div className="mt-4 space-y-2">
    {curso.Inscritos &&
      JSON.parse(curso.Inscritos).map((inscrito: Inscrito) => (
        <div key={inscrito.id} className="border p-4 rounded-lg">
          <div className="font-semibold">Inscrito: {inscrito.docInscr}</div>
          <div>Estado: {inscrito.est ? "Activo" : "Inactivo"}</div>
          <div>Fecha Inscripción: {new Date(inscrito.fecreg).toLocaleDateString()}</div>

          {/* Select para asignar/especificar la nota */}
          <label className="block mt-2 font-medium">Especificación de Nota:</label>
          <select
            className="mt-1 border px-3 py-1 rounded"
            defaultValue={inscrito.Notas?.[0]?.Nota ?? ""}
            onChange={(e) =>
              handleChangeEspecificacion(
                inscrito.id,
                Number(e.target.value),
                inscrito.Notas?.[0]?.idRegistro // para actualizar si ya existe
              )
            }
          >
            <option value="">Seleccione una opción</option>
            {opciones.map((opcion) => (
              <option key={opcion.id} value={opcion.id}>
                {opcion.Especificacion}
              </option>
            ))}
          </select>
        </div>
      ))}
  </div>
)}