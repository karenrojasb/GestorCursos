const handleChangeEspecificacion = async (
  idInscrito: number,
  idEspecificacion: number,
  idNotaExistente?: number,
  idCur?: number,
  docInscr?: string
) => {
  if (!idCur) {
    alert("ID de curso inválido.");
    return;
  }

  try {
    setGuardando(true);

    const especificacionObj = opciones.find(op => op.id === idEspecificacion);
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
    const notaNumerica = idEspecificacion;

    const notaData = {
      idInscrito,
      idCurso: idCur,
      docInscr,
      idRegistro: idEmp,
      Nota: notaNumerica,
      FechaRegistro: new Date(),
    };

    const response = await fetch(
      idNotaExistente
        ? `http://localhost:8090/api/notas/${idNotaExistente}`
        : "http://localhost:8090/api/notas",
      {
        method: idNotaExistente ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(notaData),
      }
    );

    if (!response.ok) throw new Error("Error al guardar la nota");

    const nuevaNota = await response.json();

    const actualizarInscritos = (inscritos: Inscrito[]) =>
      inscritos.map((inscrito) =>
        inscrito.id === idInscrito
          ? {
              ...inscrito,
              Notas: [
                {
                  ...nuevaNota,
                  NotaEspecificacion: descripcion,
                },
              ],
            }
          : inscrito
      );

    setCursos((prevCursos) =>
      prevCursos.map((curso) =>
        curso.id === idCur
          ? {
              ...curso,
              Inscritos: actualizarInscritos(curso.Inscritos ?? []),
            }
          : curso
      )
    );

    setCursosFiltrados((prevCursos) =>
      prevCursos.map((curso) =>
        curso.id === idCur
          ? {
              ...curso,
              Inscritos: actualizarInscritos(curso.Inscritos ?? []),
            }
          : curso
      )
    );
  } catch (error) {
    console.error("Error al guardar nota:", error);
    alert("Hubo un error al guardar la nota.");
  } finally {
    setGuardando(false);
  }
};