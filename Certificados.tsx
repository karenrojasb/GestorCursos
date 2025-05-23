const handleChangeEspecificacion = async (
  idInscrito: number,
  idEspecificacion: number,
  idNotaExistente?: number,
  idCur?: number,
  docInscr?: string
) => {
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
      idInscrito: idInscrito,
      idCurso: idCur,
      docInscr: docInscr,
      idRegistro: idEmp,
      Nota: notaNumerica,
      FechaRegistro: new Date(),
    };

    let response;
    if (idNotaExistente) {
      response = await fetch(`http://localhost:8090/api/notas/${idNotaExistente}`, {
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

    const nuevaNota = await response.json();

    const actualizarCursoConNota = (curso) => {
      if (curso.id !== idCur) return curso;

      const inscritosArray = Array.isArray(curso.Inscritos)
        ? curso.Inscritos
        : JSON.parse(curso.Inscritos || '[]');

      const inscritosActualizados = inscritosArray.map((inscrito: Inscrito) => {
        if (inscrito.id === idInscrito) {
          return {
            ...inscrito,
            Notas: [
              {
                ...nuevaNota,
                NotaEspecificacion: descripcion,
              },
            ],
          };
        }
        return inscrito;
      });

      return {
        ...curso,
        Inscritos: inscritosActualizados,
      };
    };

    setCursos((prevCursos) => prevCursos.map(actualizarCursoConNota));
    setCursosFiltrados((prevCursos) => prevCursos.map(actualizarCursoConNota));

  } catch (error) {
    console.error("Error al guardar nota:", error);
    alert("Hubo un error al guardar la nota.");
  } finally {
    setGuardando(false);
  }
};