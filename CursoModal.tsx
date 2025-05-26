const añosUnicos: number[] = Array.from(
  new Set(
    data.map((curso: Curso) => new Date(curso.Fin).getFullYear())
  )
).sort((a, b) => b - a);

setYear(añosUnicos);