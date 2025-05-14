const handleGuardar = async () => {
  if (notaSeleccionada === null || isNaN(notaSeleccionada)) {
    alert("Por favor selecciona una nota válida");
    return;
  }

  if (!idEmp) {
    alert("Error: ID de empleado no encontrado.");
    return;
  }

  setGuardando(true);

  try {
    // Paso 1: Consultar si ya existe nota
    const responseGet = await fetch(
      `http://localhost:8090/api/notas/curso-inscrito?idCurso=${idCur}&idInscrito=${documento}`
    );

    if (!responseGet.ok) {
      throw new Error("Error al verificar existencia de nota.");
    }

    const notaExistente = await responseGet.json();

    if (notaExistente && notaExistente.id) {
      // Paso 2: Si existe, actualizar
      const responsePut = await fetch(`http://localhost:8090/api/notas/${notaExistente.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Nota: notaSeleccionada,
          idRegistro: Number(idEmp),
          FechaRegistro: new Date(),
        }),
      });

      if (!responsePut.ok) {
        throw new Error("Error al actualizar la nota.");
      }
    } else {
      // Paso 3: Si no existe, crear
      const responsePost = await fetch("http://localhost:8090/api/notas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idCurso: idCur,
          idInscrito: documento,
          idRegistro: Number(idEmp),
          Nota: notaSeleccionada,
          FechaRegistro: new Date(),
        }),
      });

      if (!responsePost.ok) {
        throw new Error("Error al crear la nota.");
      }
    }

    onGuardar(String(notaSeleccionada));
    onClose();
  } catch (error) {
    console.error("Error al guardar nota:", error);
    alert("Hubo un error al guardar la nota.");
  } finally {
    setGuardando(false);
  }
};