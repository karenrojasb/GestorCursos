const handleChangeEspecificacion = async (
  idInscripcion: number,
  idEspecificacion: number
) => {
  // Buscar la inscripción dentro de los arrays del objeto inscripciones
  let inscripcion: Inscritos | undefined;
  let cursoIdEncontrado: number | null = null;

  for (const cursoId in inscripciones) {
    const listaInscripciones = inscripciones[Number(cursoId)];
    const encontrada = listaInscripciones.find((i) => i.id === idInscripcion);
    if (encontrada) {
      inscripcion = encontrada;
      cursoIdEncontrado = Number(cursoId);
      break;
    }
  }

  if (!inscripcion || cursoIdEncontrado === null) return;

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

    const notaData = {
      idCurso: inscripcion.idCur,
      idInscrito: inscripcion.docInscr,
      idRegistro: idEmp,
      Nota: idEspecificacion,
      FechaRegistro: new Date(),
    };

    let response;
    if (inscripcion.notaId) {
      response = await fetch(`http://localhost:8090/api/notas/${inscripcion.notaId}`, {
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

    const nuevoIdNota = !inscripcion.notaId ? (await response.json()).id : inscripcion.notaId;

    // Actualizar el estado correctamente
    setInscripciones((prev) => ({
      ...prev,
      [cursoIdEncontrado!]: prev[cursoIdEncontrado!].map((i) =>
        i.id === idInscripcion
          ? { ...i, especificacion: descripcion, notaId: nuevoIdNota }
          : i
      ),
    }));

  } catch (error) {
    console.error("Error al guardar nota:", error);
    alert("Hubo un error al guardar la nota.");
  } finally {
    setGuardando(false);
  }
};