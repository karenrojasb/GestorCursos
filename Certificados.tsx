<span className="flex items-center justify-center gap-1 text-gray-700">
  {curso.EstadoNombre === 'Activo' && (
    <>
      <span className="w-2.5 h-2.5 bg-green-500 rounded-full" title="Activo"></span>
      <span>{curso.EstadoNombre}</span>
    </>
  )}
  {curso.EstadoNombre === 'Cancelado' && (
    <>
      <span className="w-2.5 h-2.5 bg-red-500 rounded-full" title="Cancelado"></span>
      <span>{curso.EstadoNombre}</span>
    </>
  )}
  {curso.EstadoNombre === 'Terminado' && (
    <>
      <span className="w-2.5 h-2.5 bg-gray-500 rounded-full" title="Terminado"></span>
      <span>{curso.EstadoNombre}</span>
    </>
  )}
</span>



