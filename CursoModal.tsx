const añoActual = new Date().getFullYear();

const cursosDelAñoActual = data.filter(
  (curso: Curso) => new Date(curso.Fin).getFullYear() === añoActual
);

setYearSeleccionado(añoActual);
setCursosFiltrados(cursosDelAñoActual);