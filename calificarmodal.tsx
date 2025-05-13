const handleGuardar = async () => {
  if (notaSeleccionada === null) {
    alert("Por favor selecciona una nota");
    return;
  }

  setGuardando(true);

  try {
    const response = await fetch("http://localhost:8090/api/Notas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idCurso: idCur, // Se sube como idCurso
        idInscrito: documento, // Se sube como idInscrito
        idRegistro: idEmp, // Se sube el id_emp como idRegistro
        Nota: notaSeleccionada, // La nota seleccionada
      }),
    });

    // Revisar el status de la respuesta y su cuerpo
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error detallado al guardar la nota:", errorData);
      throw new Error("Error al guardar la nota");
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