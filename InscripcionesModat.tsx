<table className="w-full border-collapse border border-white">
  <thead className="bg-[#990000] text-white border-gray-100">
    <tr>
      <th className="border p-3 w-[10%] text-center">ID Curso</th>
      <th className="border p-3 w-[50%] text-center">Nombre del Curso</th>
      <th className="border p-3 w-[20%] text-center">Fecha Registro</th>
      <th className="border p-3 w-[20%] text-center min-w-[150px]">Acciones</th>
    </tr>
  </thead>
  <tbody>
    {Object.entries(groupedInscripciones).map(([cursoId, inscripciones], index) => {
      const curso = inscripciones[0];
      return (
        <React.Fragment key={cursoId}>
          <tr className={`${index % 2 === 0 ? "bg-white" : "bg-gray-100"} text-center transition`}>
            <td className="border border-gray-300 p-3">{cursoId}</td>
            <td className="border border-gray-300 p-3 truncate max-w-[200px]">
              {curso.NombreCurso || curso.Cursos?.NombreCurso || curso.curso?.NombreCurso || "Desconocido"}
            </td>
            <td className="border border-gray-300 p-3">{new Date(curso.fecreg).toLocaleDateString()}</td>
            <td className="border border-gray-300 p-3 min-w-[150px] flex justify-center gap-3">
              <button
                onClick={() => toggleExpand(Number(cursoId))}
                className="bg-[#990000] text-white px-3 rounded-md hover:bg-red-700 transition hover:scale-110 active:scale-95"
              >
                {expandedCourses[Number(cursoId)] ? "Ver menos" : "Ver más"}
              </button>

              <button
                onClick={() => handleDownloadExcelByCurso(Number(cursoId))}
                className="flex items-center gap-2 bg-green-600 text-white px-1 py-1 rounded-md hover:bg-green-700 transition hover:scale-110 active:scale-95"
              >
                <ArrowDownTrayIcon className="w-5 h-5" />
                Descargar
              </button>
            </td>
          </tr>