          <table className="w-full border-collapse border border-gray-300">
              <thead className="bg-[#990000] text-white">
                <tr>
                  <th className="border border-gray-300 p-3">ID Curso</th>
                  <th className="border border-gray-300 p-3">Nombre del Curso</th>
                  <th className="border border-gray-300 p-3">Fecha Registro</th>
                  <th className="border border-gray-300 p-3">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(groupedInscripciones).map(([cursoId, inscripciones], index) => {
                  const curso = inscripciones[0];
                  return (
                    <React.Fragment key={cursoId}>
                      <tr className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"} text-center transition`}>
                        <td className="border border-gray-300 p-3">{cursoId}</td>
                        <td className="border border-gray-300 p-3">{curso.NombreCurso || curso.Cursos?.NombreCurso || curso.curso?.NombreCurso || "Desconocido"}</td>
                        <td className="border border-gray-300 p-3">{new Date(curso.fecreg).toLocaleDateString()}</td>
                        <td className="border border-gray-300 p-3 flex justify-center gap-3">
                          
                          <button
                            onClick={() => toggleExpand(Number(cursoId))}
                            className="bg-[#990000] text-white px-3 py-1 rounded-md hover:bg-red-700 transition"
                          >
                            {expandedCourses[Number(cursoId)] ? "Ver menos" : "Ver más"}
                          </button>

                          <button
                          onClick={() => handleDownloadExcelByCurso (Number(cursoId))}
                          className="flex items-center gap-2 bg-green-600 text-white px-1 py-1 rounded-md hover:bg-green-700 transition">
                            <ArrowDownTrayIcon className="w-5 h-5"/>
                            Descargar
                          </button>
                        </td>
                      </tr>

                      {expandedCourses[Number(cursoId)] && (
                        <tr>
                          <td colSpan={4}>
                            <div className="p-4 bg-gray-50 border border-gray-300 rounded-md shadow-md mt-2">
                              <h3 className="text-lg font-semibold text-[#990000]">Inscritos:</h3>
                              <table className="w-full border-collapse border border-gray-300">
                                <thead className="bg-gray-200">
                                  <tr>
                                    <th className="border border-gray-300 p-2">Nombre del inscrito</th>
                                    <th className="border border-gray-300 p-2">Numero de documento</th>
                                    <th className="border border-gray-300 p-2">Fecha de inscripción</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {inscripciones
                                  .filter((inscripciones) => Number(inscripciones.est) ===1)
                                  .map((inscripciones) => (
                                    <tr key={inscripciones.id} className={`text-center border border-gray-300 ${index % 2 === 0 ? "bg-white" : "bg-gray-100"}`}>
                                      <td className="border border-gray-300 p-2">{inscripciones.nombre}</td>
                                      <td className="border border-gray-300 p-2 ">{inscripciones.docInscr}</td>
                                      <td className="border border-gray-300 p-2">{inscripciones.fecreg}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
  
