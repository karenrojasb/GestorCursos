const handleChangeEspecificacion = async (
  idInscripcion: number,
  nuevaEspecificacion: string
) => {
  const inscripcion = inscripciones.find((i) => i.id === idInscripcion);
  if (!inscripcion) return;

  try {
    setGuardando(true);

    // Validar si se seleccionó una especificación
    if (!nuevaEspecificacion) {
      alert("Selecciona una especificación válida.");
      return;
    }

    // Leer id_emp del localStorage
    const idEmpString = localStorage.getItem("id_emp");
    if (!idEmpString) {
      alert("No se encontró el id_emp en localStorage");
      setGuardando(false);
      return;
    }
    const idEmp = Number(idEmpString);

    // Mapeo de especificaciones a notas
    const especificacionANota: Record<string, number> = {
      "No Aprovado": 32,
      "Aprovado": 33,
      "Nunca asistió": 34,
      "Abandono": 35,
    };

    const notaNumerica = especificacionANota[nuevaEspecificacion];

    if (!notaNumerica) {
      alert("La especificación seleccionada no es válida.");
      setGuardando(false);
      return;
    }

    const nuevaNota = {
      idCurso: inscripcion.idCur,
      idInscrito: inscripcion.docInscr,
      idRegistro: idEmp,
      nota: notaNumerica,
      FechaRegistro: new Date(),
    };

    const response = await fetch("http://localhost:8090/api/notas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevaNota),
    });

    if (!response.ok) throw new Error("Error al guardar la nota");

    setInscripciones((prev) =>
      prev.map((i) =>
        i.id === idInscripcion
          ? { ...i, Especificacion: nuevaEspecificacion }
          : i
      )
    );
  } catch (error) {
    console.error("Error al guardar nota:", error);
    alert("Hubo un error al guardar la nota.");
  } finally {
    setGuardando(false);
  }
};