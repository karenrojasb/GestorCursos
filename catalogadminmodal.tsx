{Object.keys(editandoCurso).map((key) => (
  key !== "id" && (
    <div key={key} className="mt-2">
      <label className="block text-sm font-bold">{key}</label>

      {key === "Publico" ? (
        // Si el campo es "Publico", usa un <select> en lugar de un <input>
        <select
          name="Publico"
          value={editandoCurso.Publico}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        >
          {opcionesPublico.map((opcion) => (
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