const datosInscritos = inscritos.map((inscrito) => {
  const nota = inscrito.Notas?.[0];
  return {
    ID: inscrito.id,
    Documento: inscrito.docInscr,
    Estado: inscrito.est ? "Activo" : "Inactivo",
    FechaInscripción: new Date(inscrito.fecreg).toLocaleDateString(),
    Nota: nota?.Nota ?? "",
    idRegistro: nota?.idRegistro ?? "",
    FechaRegistro: nota?.FechaRegistro ? new Date(nota.FechaRegistro).toLocaleDateString() : "",
  };
});