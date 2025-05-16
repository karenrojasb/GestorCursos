<td className="border p-2 text-center">
  <button
    onClick={() => handleInscripcion(curso.id, !!inscripcion, inscripcion?.id)}
    className={`${
      inscripcion
        ? "bg-[#990000] hover:bg-red-700 text-white"
        : "bg-green-600 hover:bg-green-700 text-white"
    } px-3 py-1 rounded text-sm min-w-[120px] transition-colors duration-300`}
  >
    {inscripcion ? "Cancelar" : "Inscribirse"}
  </button>
</td>