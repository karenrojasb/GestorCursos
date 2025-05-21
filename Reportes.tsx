<div className="relative bg-gray-100 p-4 mt-4 overflow-x-auto min-w-[1000px]">
  {/* Tabla de datos del curso */}
  <div className="flex justify-center">
    <table className="min-w-full table-fixed text-[0.8rem] shadow-md rounded-lg border border-gray-300 bg-white">
      {/* ...contenido tabla curso... */}
    </table>
  </div>

  {/* Tabla de inscritos */}
  {curso.Inscritos && curso.Inscritos !== "[]" && (
    <div className="mt-8 flex justify-center">
      <table className="min-w-full text-[0.8rem] table-fixed border border-gray-300 bg-white shadow-md rounded-lg">
        {/* ...contenido tabla inscritos... */}
      </table>
    </div>
  )}
</div>