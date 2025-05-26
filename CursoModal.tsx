Type 'unknown[]' is not assignable to type 'number[]'.
  Type 'unknown' is not assignable to type 'number'.ts(232

const añosUnicos: number[] = Array.from(
  new Set(
    data.map((curso: Curso) => new Date(curso.Fin).getFullYear())
  )
).sort((a, b) => b - a);

setYear(añosUnicos);

