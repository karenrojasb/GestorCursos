const añosUnicos = Array.from(
  new Set(
    data.map((curso: Curso) => new Date(curso.Fin).getFullYear())
  )
) as number[];

añosUnicos.sort((a, b) => b - a);
setYear(añosUnicos);