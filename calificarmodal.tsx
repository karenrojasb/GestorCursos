const guardarNota = async (notaTexto: string) => {
  if (!inscritoSeleccionado) return;

  const idCur = inscritoSeleccionado.idCur;
  const idInscrito = Number(inscritoSeleccionado.doc);
  const Nota = Number(notaTexto);
  const idRegistro = 1; // o lo que necesites

  try {
    const response = await fetch("http://localhost:8090/api/Notas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        idCur,
        idInscrito,
        Nota,
        idRegistro,
      }),
    });

    if (!response.ok) throw new Error("Error al guardar la nota");

    // Si el backend devuelve la nota actualizada, úsala. 
    // Aquí asumo que devuelve el objeto guardado o al menos la nota.
    const data = await response.json();

    // Actualizamos el estado local con la nota nueva
    setInscripciones((prevInscripciones) =>
      prevInscripciones.map((insc) => {
        if (insc.id === inscritoSeleccionado.id) {
          // Actualiza nota y especificacion, o el campo que uses para mostrar la nota
          return {
            ...insc,
            Nota: data.Nota || Nota,
            Especificacion: `Nota: ${data.Nota || Nota}`, // o el texto que corresponda
          };
        }
        return insc;
      })
    );

    setModalCalificarAbierto(false);
    setInscritoSeleccionado(null);

    console.log("Nota guardada exitosamente");
  } catch (error) {
    console.error("Error al guardar nota:", error);
  }
};