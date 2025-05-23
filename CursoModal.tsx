  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
      <label>Profesor</label>
      <select name="Profesor" value={formData.Profesor ?? 0} onChange={handleChange} className="w-full border p-2 rounded-lg">
        <option value="">Selecciona una opción</option>
        {profesores.map((p) => (
          <option key={p.id_emp} value={p.id_emp}>{p.nombre}</option>
        ))}
      </select>
    </div>
    <div>
      <label>Segundo Profesor</label>
      <select name="SegundoPro" value={formData.SegundoPro
         ?? 0} onChange={handleChange} className="w-full border p-2 rounded-lg">
        <option value="">Selecciona una opción</option>
        {profesores.map((p) => (
          <option key={p.id_emp} value={p.id_emp}>{p.nombre}</option>
        ))}
      </select>
    </div>
  </div>
