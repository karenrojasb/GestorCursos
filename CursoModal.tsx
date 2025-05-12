const guardarNota = async (notaTexto: string) => {
  if (!inscritoSeleccionado) return;

  const idCurso = inscritoSeleccionado.idCur;
  const idInscrito = Number(inscritoSeleccionado.doc);
  const Nota = Number(notaTexto);
  const idRegistro = 1;

  try {
    const response = await fetch("http://localhost:8090/api/Notas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        idCurso,
        idInscrito,
        Nota,
        idRegistro,
      }),
    });

    if (!response.ok) throw new Error("Error al guardar la nota");

    console.log("Nota guardada exitosamente");
  } catch (error) {
    console.error("Error al guardar nota:", error);
  }
};