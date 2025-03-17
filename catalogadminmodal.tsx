{/* FORMULARIO DE EDICIÓN */}
{Object.keys(editandoCurso).map((key) => (
  key !== "id" && (
    <div key={key} className="mt-2">
      <label className="block text-sm font-bold">{key}</label>

      {/* Renderizar select si el campo tiene opciones */}
      {key === "Publico" ? (
        <select
          name={key}
          value={editandoCurso[key as keyof Curso] || ""}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        >
          {opcionesPublico.map((opcion) => (
            <option key={opcion.id} value={opcion.id}>
              {opcion.Especificacion}
            </option>
          ))}
        </select>
      ) : key === "Linea" ? (
        <select
          name={key}
          value={editandoCurso[key as keyof Curso] || ""}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        >
          {opcionesLinea.map((opcion) => (
            <option key={opcion.id} value={opcion.id}>
              {opcion.Especificacion}
            </option>
          ))}
        </select>
      ) : key === "Modalidad" ? (
        <select
          name={key}
          value={editandoCurso[key as keyof Curso] || ""}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        >
          {opcionesModalidad.map((opcion) => (
            <option key={opcion.id} value={opcion.id}>
              {opcion.Especificacion}
            </option>
          ))}
        </select>
      ) : key === "Estado" ? (
        <select
          name={key}
          value={editandoCurso[key as keyof Curso] || ""}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        >
          {opcionesEstado.map((opcion) => (
            <option key={opcion.id} value={opcion.id}>
              {opcion.Especificacion}
            </option>
          ))}
        </select>
      ) : key === "IdTipoCurso" ? (
        <select
          name={key}
          value={editandoCurso[key as keyof Curso] || ""}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        >
          {opcionesTipoCurso.map((opcion) => (
            <option key={opcion.id} value={opcion.id}>
              {opcion.Especificacion}
            </option>
          ))}
        </select>
      ) : (
        <input
          type="text"
          name={key}
          value={editandoCurso ? (editandoCurso as any)[key] ?? "" : ""}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
      )}
    </div>
  )
))}