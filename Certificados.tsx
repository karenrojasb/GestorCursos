const handleChangeEspecificacion = async (
  idInscripcion: number,
  idEspecificacion: number
) => {
  const inscripcion = inscripciones.find((i) => i.id === idInscripcion);
  if (!inscripcion) return;

  try {
    setGuardando(true);

    const especificacionObj = opciones.find((op) => op.id === idEspecificacion);
    if (!especificacionObj) {
      alert("Especificación no encontrada.");
      return;
    }

    const descripcion = especificacionObj.Especificacion;

    // Leer id_emp del localStorage
    const idEmpString = localStorage.getItem("id_emp");
    if (!idEmpString) {
      alert("No se encontró el id_emp en localStorage");
      setGuardando(false);
      return;
    }
    const idEmp = Number(idEmpString);

    // Relación de ID de especificación a nota (usa directamente el ID recibido)
    const notaNumerica = idEspecificacion;

    const nuevaNota = {
      idCurso: inscripcion.idCur,
      idInscrito: inscripcion.docInscr,
      idRegistro: idEmp,
      Nota: notaNumerica,
      FechaRegistro: new Date(),
    };

    const response = await fetch("http://localhost:8090/api/notas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevaNota),
    });

    if (!response.ok) throw new Error("Error al guardar la nota");

    // Actualizar estado local
    setInscripciones((prev) =>
      prev.map((i) =>
        i.id === idInscripcion
          ? { ...i, Especificacion: descripcion } // muestra el texto
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