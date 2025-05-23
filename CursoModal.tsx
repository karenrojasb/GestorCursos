<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <div>
    <label>Profesor</label>
    <select name="Profesor" value={formData.Profesor} onChange={handleChange} className="w-full border p-2 rounded-lg">
      <option value="">Selecciona un profesor</option>
      {profesores.map((prof) => (
        <option key={prof.id_emp} value={prof.id_emp}>{prof.nombre}</option>
      ))}
    </select>
    {formData.NombreProfesor && <p className="text-sm text-gray-600 mt-1">Actual: {formData.NombreProfesor}</p>}
  </div>
  <div>
    <label>Segundo Profesor</label>
    <select name="SegundoPro" value={formData.SegundoPro} onChange={handleChange} className="w-full border p-2 rounded-lg">
      <option value="">Selecciona un segundo profesor</option>
      {profesores.map((prof) => (
        <option key={prof.id_emp} value={prof.id_emp}>{prof.nombre}</option>
      ))}
    </select>
    {formData.NombreSegundoPro && <p className="text-sm text-gray-600 mt-1">Actual: {formData.NombreSegundoPro}</p>}
  </div>
</div>




const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  const value = e.target.type === "number" || e.target.name === "Profesor" || e.target.name === "SegundoPro"
    ? Number(e.target.value)
    : e.target.value;

  setFormData((prev) => ({
    ...prev,
    [e.target.name]: value,
  }));
};