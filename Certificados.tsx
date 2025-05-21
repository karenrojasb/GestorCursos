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
      setGuardando(false);
      return;
    }

    const descripcion = especificacionObj.Especificacion;

    const idEmpString = localStorage.getItem("id_emp");
    if (!idEmpString) {
      alert("No se encontró el id_emp en localStorage");
      setGuardando(false);
      return;
    }
    const idEmp = Number(idEmpString);

    const notaNumerica = idEspecificacion;

    // Datos para crear o actualizar nota
    const notaData = {
      idCurso: inscripcion.idCur,
      idInscrito: inscripcion.docInscr,
      idRegistro: idEmp,
      Nota: notaNumerica,
      FechaRegistro: new Date(),
    };

    let response;

    if (inscripcion.idNotas) {
      // Si existe idNotas, actualizamos con PUT
      response = await fetch(`http://localhost:8090/api/notas/${inscripcion.idNotas}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(notaData),
      });
    } else {
      // Si no existe, creamos con POST
      response = await fetch("http://localhost:8090/api/notas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(notaData),
      });
    }

    if (!response.ok) throw new Error("Error al guardar la nota");

    // Si hiciste POST, posiblemente quieras actualizar idNotas con el id nuevo
    if (!inscripcion.idNotas) {
      const respuestaJson = await response.json();
      // Asumo que devuelve el objeto nota creado con su id
      const nuevoIdNota = respuestaJson.id; 
      
      // Actualizar idNotas junto con Especificacion
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
      // Solo actualizar especificación si fue PUT
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