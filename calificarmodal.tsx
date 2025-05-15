useEffect(() => {
  const storedId = localStorage.getItem("id_emp");
  if (storedId) setIdEmp(Number(storedId));
}, []);

useEffect(() => {
  const fetchDatos = async () => {
    try {
      const respOpciones = await fetch("http://localhost:8090/api/listas/Especificaciones");
      if (!respOpciones.ok) throw new Error("Error al obtener lista de notas");
      const dataOpciones = await respOpciones.json();
      setOpciones(dataOpciones);
    } catch (error) {
      console.error("Error cargando opciones:", error);
    }
  };

  fetchDatos();
}, []);



const handleGuardar = async () => {
  if (!notaSeleccionada || !idEmp) {
    alert("Faltan datos para guardar la calificación.");
    return;
  }

  setGuardando(true);

  try {
    // Consultar si ya existe una nota para este curso y documento
    const responseGet = await fetch(
      `http://localhost:8090/api/notas/existe?idCurso=${idCur}&idInscrito=${documento}`
    );

    const notaExistente = responseGet.ok ? await responseGet.json() : null;
    const notaYaExiste = notaExistente && typeof notaExistente === 'object' && 'id' in notaExistente;

    if (notaYaExiste) {
      // Actualizar nota existente
      await fetch(`http://localhost:8090/api/notas/${notaExistente.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Nota: notaSeleccionada,
          idRegistro: idEmp,
          FechaRegistro: new Date(),
        }),
      });
    } else {
      // Crear nueva nota
      await fetch("http://localhost:8090/api/notas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idCurso: idCur,
          idInscrito: documento,
          Nota: notaSeleccionada,
          idRegistro: idEmp,
          FechaRegistro: new Date(),
        }),
      });
    }

    // Actualizar inscripción
    await fetch(`http://localhost:8090/api/inscripciones/${idIns}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        Nota: notaSeleccionada,
        idRegistro: idEmp,
      }),
    });

    onGuardar(String(notaSeleccionada));
    onClose();
  } catch (error) {
    console.error("Error al guardar nota:", error);
    alert("Hubo un error al guardar la nota.");
  } finally {
    setGuardando(false);
  }
};
