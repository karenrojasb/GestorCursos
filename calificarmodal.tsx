const handleGuardar = async () => {
  if (notaSeleccionada === null) {
    alert("Por favor selecciona una nota");
    return;
  }

  setGuardando(true);

  try {
    const idRegistro = localStorage.getItem("id_emp");

    const payload = {
      idCurso,
      idInscrito: documento,
      Nota: notaSeleccionada,
      idRegistro: idRegistro ? parseInt(idRegistro) : null,
    };

    console.log("Enviando datos al backend:", payload);

    const response = await fetch("http://localhost:8090/api/Notas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const resultado = await response.json().catch(() => null); // Captura si no es JSON

    console.log("Respuesta del backend:", response.status, resultado);

    if (response.status >= 200 && response.status < 300) {
      onGuardar(String(notaSeleccionada));
      onClose();
    } else {
      throw new Error("Respuesta no exitosa del servidor");
    }
  } catch (error) {
    console.error("Error al guardar nota:", error);
    alert("Hubo un error al guardar la nota.");
  } finally {
    setGuardando(false);
  }
};