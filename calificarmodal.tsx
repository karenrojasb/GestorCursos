const handleGuardar = async () => {
  if (notaSeleccionada === null) {
    alert("Por favor selecciona una nota");
    return;
  }

  setGuardando(true);

  try {
    const idRegistro = localStorage.getItem("id_emp"); // o el valor correspondiente

    const response = await fetch("http://localhost:8090/api/Notas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idCurso,
        idInscrito: documento,
        Nota: notaSeleccionada,
        idRegistro: idRegistro ? parseInt(idRegistro) : null, // convierte a número si es necesario
      }),
    });

    if (!response.ok) throw new Error("Error al guardar la nota");

    onGuardar(String(notaSeleccionada));
    onClose();
  } catch (error) {
    console.error("Error al guardar nota:", error);
    alert("Hubo un error al guardar la nota.");
  } finally {
    setGuardando(false);
  }
};