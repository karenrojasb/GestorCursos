const handleBuscar = (e: React.ChangeEvent<HTMLInputElement>) => {
  const texto = e.target.value.toLowerCase();
  setBusqueda(texto);

  const filtrados = inscripciones.filter((inscripcion) => {
    const cursoNombre = inscripcion.NombreCurso?.toLowerCase() || "";
    const fechaRegistro = inscripcion.fecreg
      ? new Date(inscripcion.fecreg).toLocaleDateString().toLowerCase()
      : "";
    const idCurso = String(inscripcion.idCur || "").toLowerCase();
    const nombreInscrito = inscripcion.nombre?.toLowerCase() || "";
    const docInscrito = inscripcion.docInscr?.toLowerCase() || "";

    return (
      idCurso.includes(texto) ||
      cursoNombre.includes(texto) ||
      fechaRegistro.includes(texto) ||
      nombreInscrito.includes(texto) ||
      docInscrito.includes(texto)
    );
  });

  setInscripcionesFiltradas(filtrados);
};