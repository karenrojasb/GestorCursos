const valorNota = opciones.find(op => op.id === Number(nuevaEspecificacion))?.Especificacion;

if (!valorNota || isNaN(Number(valorNota))) {
  alert("La especificación seleccionada no contiene una nota válida.");
  setGuardando(false);
  return;
}

const nuevaNota = {
  idCurso: inscripcion.idCur,
  idInscrito: inscripcion.docInscr,
  idRegistro: idEmp,
  nota: Number(valorNota),
  FechaRegistro: new Date(),
};