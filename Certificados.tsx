<td className="px-4 py-2">
  <span className="text-black">{insc.Especificacion || 'Sin Nota'}</span>
  <div className="flex items-center gap-2 mt-1">
    <button
      onClick={() => abrirModalCalificar(insc.nombre, insc.docInscr)}
      className={`flex items-center px-3 py-1.5 rounded-md text-white transition hover:scale-110 active:scale-95
        ${insc.Nota ? 'bg-blue-600 hover:bg-blue-700' : 'bg-[#990000] hover:bg-[#7a0000]'}`}
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
  </div>
</td>