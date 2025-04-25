const notaEncontrada = nota.find(n => {
  const mismoInscrito = n.idInscrito === Number(inscripciones.docInscr);
  const mismoCurso = n.idCurso === Number(cursoId);
  console.log("Comparando nota:", {
    nota: n,
    doc: inscripciones.docInscr,
    cursoId,
    mismoInscrito,
    mismoCurso
  });
  return mismoInscrito && mismoCurso;
});



{notaEncontrada && (
  <span className="text-black font-semibold text-sm">
    {notaEncontrada.Nota} - {notaEncontrada.Especificacion}
  </span>
)}


