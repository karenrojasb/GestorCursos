const guardarNota = async (notaTexto: string) => {
  if (!inscritoSeleccionado) return;

  const idCur = inscritoSeleccionado.idCur;
  const idInscrito = Number(inscritoSeleccionado.doc);
  const Nota = Number(notaTexto);
  const idRegistro = 1; // o lo que necesites

  // Función para obtener la descripción según la nota
  const getEspecificacion = (nota: number) => {
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

    const data = await response.json();

    const notaGuardada = data.Nota || Nota;
    const especificacion = getEspecificacion(notaGuardada);

    setInscripciones((prevInscripciones) =>
      prevInscripciones.map((insc) => {
        if (insc.id === inscritoSeleccionado.id) {
          return {
            ...insc,
            Nota: notaGuardada,
            Especificacion: especificacion,
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