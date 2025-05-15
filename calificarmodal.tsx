 const guardarNota = async (notaTexto: string) => {
    if (!inscritoSeleccionado) return;
  
    const idCur = inscritoSeleccionado.idCur;
    const idInscrito = Number(inscritoSeleccionado.doc);
    const Nota = Number(notaTexto);
    const idRegistro = 1;
  
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
  
      // Actualiza localmente la nota y la especificación para ese inscrito
      setInscripciones((prevInscripciones) =>
        prevInscripciones.map((insc) =>
          insc.docInscr === idInscrito && insc.idCur === idCur
            ? {
                ...insc,
                Nota,
                Especificacion: Nota >= 33 ? "Aprobado" : "Reprobado", // O el texto que quieras poner
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
                Especificacion: Nota >= 33 ? "Aprobado" : "Reprobado",
              }
            : insc
        )
      );
  
      console.log("Nota guardada exitosamente");
  
      // Opcional: cerrar modal
      setModalCalificarAbierto(false);
    } catch (error) {
      console.error("Error al guardar nota:", error);
    }
  };
