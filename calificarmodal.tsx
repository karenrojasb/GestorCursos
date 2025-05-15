// Actualizar inscripción con idEmp y nota
await fetch(`http://localhost:8090/api/inscripciones/${idIns}`, {
  method: "PATCH",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    Nota: notaSeleccionada,
    idRegistro: Number(idEmp),
  }),
});