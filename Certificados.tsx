<button
  onClick={() => abrirModalCalificar(insc.nombre, insc.docInscr)}
  className="flex items-center px-2 py-1 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700 transition hover:scale-105"
>
  {insc.Nota ? (
    <>
      <PencilIcon className="h-4 w-4 mr-1" />
      Editar
    </>
  ) : (
    <>
      <DocumentPlusIcon className="h-4 w-4 mr-1" />
      Calificar
    </>
  )}
</button>