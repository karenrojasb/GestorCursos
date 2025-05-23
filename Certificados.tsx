const actualizarCursoConNota = (curso: Curso) => {
  if (curso.id !== idCur) return curso;

  const inscritosArray = JSON.parse(curso.Inscritos || '[]');

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
    Inscritos: JSON.stringify(inscritosActualizados),
  };
};