setCursos((prevCursos) =>
  prevCursos.map((curso) => {
    if (curso.id !== idCur) return curso;

    const inscritosActualizados = curso.Inscritos?.map((inscrito: Inscrito) => {
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
    }) ?? [];

    return {
      ...curso,
      Inscritos: inscritosActualizados,
    };
  })
);

setCursosFiltrados((prevCursos) =>
  prevCursos.map((curso) => {
    if (curso.id !== idCur) return curso;

    const inscritosActualizados = curso.Inscritos?.map((inscrito: Inscrito) => {
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
    }) ?? [];

    return {
      ...curso,
      Inscritos: inscritosActualizados,
    };
  })
);


Notas: [...(inscrito.Notas || []), { ...nuevaNota, NotaEspecificacion: descripcion }],
