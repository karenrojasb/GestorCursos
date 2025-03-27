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
