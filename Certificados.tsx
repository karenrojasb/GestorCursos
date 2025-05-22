const datosInscritos = (inscritos ?? []).map((inscrito) => {
  const nota = inscrito.Notas?.[0];

  // Encontrar especificación correspondiente si no está incluida
  const especificacion =
    nota?.NotaEspecificacion ||
    opciones.find(op => op.id === nota?.Nota)?.Especificacion || "";

  return {
    ID: inscrito.id,
    Documento: inscrito.docInscr,
    Nombre: nota?.NombreInscrito ?? "",
    Estado: inscrito.est ? "Activo" : "Inactivo",
    FechaInscripción: new Date(inscrito.fecreg).toLocaleDateString(),
    Nota: nota?.Nota ?? "",
    Especificación: especificacion,
    idRegistro: nota?.idRegistro ?? "",
    NombreRegistro: nota?.NombreRegistro ?? "",
    FechaRegistro: nota?.FechaRegistro
      ? new Date(nota.FechaRegistro).toLocaleDateString()
      : "",
  };
});