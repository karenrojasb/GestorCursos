const camposNumericos = ["Valor", "Horas", "CupoMax", "Publico", "Linea", "Estado", "Modalidad", "Unidad", "Profesor", "IdTipoCurso", "SegundoPro"];

if (value !== "") {
  if (camposNumericos.includes(key)) {
    const numero = Number(value);
    acc[key] = isNaN(numero) ? null : numero;
  } else {
    acc[key] = value;
  }
} else if (["SegundoPro", "Proexterno", "Descripcion"].includes(key)) {
  acc[key] = null;
}