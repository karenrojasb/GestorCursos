const handleInscripcion = async (idCur: number, estaInscrito: boolean, inscripcionId?: number) => {
  setInscribiendo(true);
  if (!idEmp) return;

  try {
    if (estaInscrito && inscripcionId) {
      // Cancelar inscripción
      await fetch(`http://localhost:8090/api/inscripciones/${inscripcionId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ est: false }),
      });
      setEsInscripcion(false);
      setMensajeAnimacion("Se ha desinscrito satisfactoriamente");
    } else {
      // Nueva inscripción (aquí va el código mejorado)
      const res = await fetch("http://localhost:8090/api/inscripciones", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idCur,
          docInscr: idEmp,
          est: true,
          fecreg: new Date().toISOString().split("T")[0],
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Error al inscribirse: ${res.status} - ${errorText}`);
      }

      setEsInscripcion(true);
      setMensajeAnimacion("Se ha inscrito satisfactoriamente");
    }

    const updatedResponse = await fetch(`http://localhost:8090/api/inscripciones?docInscr=${idEmp}`);
    const updatedData = await updatedResponse.json();
    setInscripciones(updatedData.filter((ins: Inscripcion) => ins.est === true));

    setMostrarAnimacion(true);
    setTimeout(() => setMostrarAnimacion(false), 2500);
  } catch (error) {
    console.error("No se pudo completar la acción:", error);
    alert(`Error al inscribirse: ${error}`);
  }

  setInscribiendo(false);
};