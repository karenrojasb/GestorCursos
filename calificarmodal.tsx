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
    const url = notaExistenteId
      ? `http://localhost:8090/api/notas/${notaExistenteId}` // PUT
      : "http://localhost:8090/api/notas"; // POST

    const method = notaExistenteId ? "PUT" : "POST";

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idCurso: idCur,
        idInscrito: documento,
        idRegistro: idEmp,
        Nota: notaSeleccionada,
        FechaRegistro: new Date(),
      }),
    });

    if (!response.ok) {
      throw new Error(`Error al ${notaExistenteId ? "actualizar" : "crear"} la nota.`);
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