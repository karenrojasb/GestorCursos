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

    const idEmpString = localStorage.getItem("id_emp");
    if (!idEmpString) {
      alert("No se encontró el id_emp en localStorage");
      return;
    }
    const idEmp = Number(idEmpString);

    const notaData = {
      idCurso: inscripcion.idCur,
      idInscrito: inscripcion.docInscr,
      idRegistro: idEmp,
      Nota: idEspecificacion,
      FechaRegistro: new Date(),
    };

    let response;
    if (inscripcion.idNotas) {
      response = await fetch(`http://localhost:8090/api/notas/${inscripcion.idNotas}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(notaData),
      });
    } else {
      response = await fetch("http://localhost:8090/api/notas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(notaData),
      });
    }

    if (!response.ok) throw new Error("Error al guardar la nota");

    // ✅ Registrar también en Auditoría
    await fetch("http://localhost:8090/api/AuditoriaNotas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(notaData),
    });

    if (!inscripcion.idNotas) {
      const respuestaJson = await response.json();
      const nuevoIdNota = respuestaJson.id;

      setInscripciones((prev) =>
        prev.map((i) =>
          i.id === idInscripcion
            ? { ...i, Especificacion: descripcion, idNotas: nuevoIdNota }
            : i
        )
      );

      setInscripcionesFiltradas((prev) =>
        prev.map((i) =>
          i.id === idInscripcion
            ? { ...i, Especificacion: descripcion, idNotas: nuevoIdNota }
            : i
        )
      );
    } else {
      setInscripciones((prev) =>
        prev.map((i) =>
          i.id === idInscripcion
            ? { ...i, Especificacion: descripcion }
            : i
        )
      );

      setInscripcionesFiltradas((prev) =>
        prev.map((i) =>
          i.id === idInscripcion
            ? { ...i, Especificacion: descripcion }
            : i
        )
      );
    }
  } catch (error) {
    console.error("Error al guardar nota:", error);
    alert("Hubo un error al guardar la nota.");
  } finally {
    setGuardando(false);
  }
};