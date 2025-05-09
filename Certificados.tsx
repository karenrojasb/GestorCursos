<div className="flex items-center gap-2">
  <span className="text-black text-sm leading-none pt-[2px]">
    {insc.Especificacion || 'Sin Nota'}
  </span>
  <button
    onClick={() => abrirModalCalificar(insc.nombre, insc.docInscr)}
    className="flex items-center gap-1 px-2 py-1 bg-[#990000] text-white text-xs rounded-md hover:bg-red-800 transition-all duration-200"
  >
    <PlusCircleIcon className="w-4 h-4" />
    Calificar
  </button>
</div>