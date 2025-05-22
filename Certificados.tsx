const handleChangeEspecificacion = async (
  idInscrito: number,
  idEspecificacion: number,
  idNotaExistente?: number
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
      idRegistro: idEmp,
      Nota: notaNumerica,
      FechaRegistro: new Date(),
    };

    let response;
    if (idNotaExistente) {
      // PUT si existe la nota
      response = await fetch(`http://localhost:8090/api/notas/${idNotaExistente}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(notaData),
      });
    } else {
      // POST si no existe la nota
      response = await fetch("http://localhost:8090/api/notas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(notaData),
      });
    }

    if (!response.ok) throw new Error("Error al guardar la nota");

    const nuevaNota = await response.json();

    // Actualizar en estado local
    setCursos((prevCursos) =>
      prevCursos.map((curso) => ({
        ...curso,
        Inscritos: curso.Inscritos
          ? JSON.stringify(
              JSON.parse(curso.Inscritos).map((inscrito: Inscrito) => {
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
              })
            )
          : curso.Inscritos,
      }))
    );

    setCursosFiltrados((prevCursos) =>
      prevCursos.map((curso) => ({
        ...curso,
        Inscritos: curso.Inscritos
          ? JSON.stringify(
              JSON.parse(curso.Inscritos).map((inscrito: Inscrito) => {
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
              })
            )
          : curso.Inscritos,
      }))
    );
  } catch (error) {
    console.error("Error al guardar nota:", error);
    alert("Hubo un error al guardar la nota.");
  } finally {
    setGuardando(false);
  }
};