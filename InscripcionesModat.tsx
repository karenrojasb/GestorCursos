<td className="border border-gray-300 p-3 flex justify-center gap-2">
  <button
    onClick={() => toggleExpand(Number(cursoId))}
    className="bg-[#990000] text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
  >
    {expandedCourses[Number(cursoId)] ? "Ver menos" : "Ver más"}
  </button>

  <button
    onClick={() => handleDownloadExcelByCurso(Number(cursoId))}
    className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
  >
    <ArrowDownTrayIcon className="w-5 h-5" />
    Descargar
  </button>
</td>