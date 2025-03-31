const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  if (!editandoCurso) return;
  const { name, value } = e.target;

  setEditandoCurso((prev) => {
    if (!prev) return null;

    const camposNumericos = ["Valor", "Publico", "Horas", "Linea", "Estado", "Modalidad", "Unidad", "Profesor", "IdTipoCurso"];

    return {
      ...prev,
      [name]: camposNumericos.includes(name) ? parseInt(value) || 0 : value,
    };
  });
};