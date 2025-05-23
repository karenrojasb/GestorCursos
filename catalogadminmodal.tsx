setCursos((prevCursos) =>
  prevCursos.map((curso) => {
    if (curso.id !== idCur) return curso;

    const inscritosActualizados = (curso.Inscritos || []).map((inscrito) => {
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
      Inscritos: inscritosActualizados, // Ya no como string
    };
  })
);