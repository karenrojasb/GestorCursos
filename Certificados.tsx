const notaData = {
  idInscrito: idInscrito,
  idCurso: idCurso,       // <- debes pasarlo desde donde llamas la función
  docInscr: docInscr,     // <- también desde el lugar donde llamas la función
  idRegistro: idEmp,
  Nota: notaNumerica,
  FechaRegistro: new Date(),
};




<select
  className="border rounded px-2 py-1 text-sm bg-white"
  value={
    opciones.find(op => op.Especificacion === inscrito.Especificacion)?.id || ""
  }
  onChange={(e) =>
    handleChangeEspecificacion(
      inscrito.id,                   // idInscrito
      Number(e.target.value),
      nota?.id,                      // idNotaExistente
      inscrito.idCur,                // idCurso
      inscrito.docInscr              // docInscr
    )
  }
>




const handleChangeEspecificacion = async (
  idInscrito: number,
  idEspecificacion: number,
  idNotaExistente?: number,
  idCurso?: number,
  docInscr?: string
) => {