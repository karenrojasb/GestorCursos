<td className="p-1 flex flex-col items-center gap-1">
  {
    (() => {
      // Convertir docInscr y cursoId a números para una comparación precisa
      const docInscrito = Number(inscripciones.docInscr);
      const idCursoNumerico = Number(cursoId);

      // Buscar la nota que coincida con el idInscrito y el idCurso
      const notaEncontrada = nota.find(n => n.idInscrito === docInscrito && n.idCurso === idCursoNumerico);

      return (
        <>
          {notaEncontrada ? (
            <span className="text-black font-semibold text-sm">
              {notaEncontrada.Nota} - {notaEncontrada.Especificacion}
            </span>
          ) : (
            <span className="text-gray-500 text-sm">No disponible</span> // Mensaje en caso de que no haya nota
          )}
          <button
            onClick={() => abrirModalCalificar(inscripciones.nombre, inscripciones.docInscr)}
            className="inline-flex items-center gap-1 px-3 py-1 rounded-md transition hover:scale-110"
          >
            <PencilIcon className="h-5 w-5 text-gray-500" />
            Calificar
          </button>
        </>
      );
    })()
  }
</td>