const guardarNota = async (notaTexto: string) => {
  if (!inscritoSeleccionado) return;

  const idCur = inscritoSeleccionado.idCur;
  const idInscrito = Number(inscritoSeleccionado.doc);
  const Nota = Number(notaTexto);
  const idRegistro = 1;

  // Obtener texto según el valor de la nota
  const obtenerEspecificacion = (nota: number): string => {
    switch (nota) {
      case 32:
        return "No aprobado";
      case 33:
        return "Aprobado";
      case 34:
        return "Nunca asistió";
      case 35:
        return "Abandono";
      default:
        return `Nota: ${nota}`;
    }
  };

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

    const especificacion = obtenerEspecificacion(Nota);

    setInscripciones((prevInscripciones) =>
      prevInscripciones.map((insc) =>
        insc.docInscr === idInscrito && insc.idCur === idCur
          ? {
              ...insc,
              Nota,
              Especificacion: especificacion,
            }
          : insc
      )
    );

    setInscripcionesFiltradas((prevInscripciones) =>
      prevInscripciones.map((insc) =>
        insc.docInscr === idInscrito && insc.idCur === idCur
          ? {
              ...insc,
              Nota,
              Especificacion: especificacion,
            }
          : insc
      )
    );

    console.log("Nota guardada exitosamente");

    setModalCalificarAbierto(false);
  } catch (error) {
    console.error("Error al guardar nota:", error);
  }
};