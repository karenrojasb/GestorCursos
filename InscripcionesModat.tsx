const notaEncontrada = nota.find(n => String(n.idInscrito).trim() === String(inscripciones.docInscr).trim());
const especificacion = notaEncontrada?.Listas?.Especificacion;

{especificacion && especificacion !== "Sin calificar"
  ? especificacion
  : "Sin Nota"}


const notaEncontrada = nota.find(n => String(n.idInscrito).trim() === String(inscripciones.docInscr).trim());
const especificacion = notaEncontrada?.Listas?.Especificacion;

{especificacion && especificacion !== "Sin calificar"
  ? especificacion
  : "Sin Nota"}