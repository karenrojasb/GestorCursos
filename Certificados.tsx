setCursos((prevCursos) =>
  prevCursos.map((curso) => {
    if (!curso.Inscritos) return curso;

    const inscritosParsed: Inscrito[] =
      typeof curso.Inscritos === "string"
        ? JSON.parse(curso.Inscritos)
        : curso.Inscritos;

    const nuevosInscritos = inscritosParsed.map((inscrito) => {
      if (inscrito.id === idInscrito || inscrito.docInscr === idInscrito) {
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
      Inscritos: nuevosInscritos,
    };
  })
);