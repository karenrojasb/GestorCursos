const handleChangeEspecificacion = async (
  idInscripcion: number,
  idEspecificacion: number
) => {
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

    // Buscar el curso y luego el inscrito dentro de él
    const cursoActual = cursos.find((curso) =>
      curso.Inscritos && JSON.parse(curso.Inscritos).some((inscrito: Inscrito) => inscrito.id === idInscripcion)
    );
    if (!cursoActual) {
      alert("Curso no encontrado para el inscrito.");
      return;
    }

    const inscritos: Inscrito[] = JSON.parse(cursoActual.Inscritos!);
    const inscrito = inscritos.find((i) => i.id === idInscripcion);
    if (!inscrito) {
      alert("Inscrito no encontrado.");
      return;
    }

    const nota = inscrito.Notas?.[0];
    const notaData = {
      idCurso: cursoActual.id,
      idInscrito: inscrito.docInscr,
      idRegistro: idEmp,
      Nota: idEspecificacion,
      FechaRegistro: new Date(),
    };

    let response;

    if (nota?.idRegistro) {
      response = await fetch(`http://localhost:8090/api/notas/${nota.idRegistro}`, {
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

    // Actualizar la lista de cursos
    fetchCursos();
  } catch (error) {
    console.error("Error al guardar la nota:", error);
    alert("Ocurrió un error al guardar la nota.");
  } finally {
    setGuardando(false);
  }
};