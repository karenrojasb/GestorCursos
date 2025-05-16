  
                      <td className="border p-2 text-center">
                        <button
                          onClick={() => handleInscripcion(curso.id, !!inscripcion, inscripcion?.id)}
                          className={`${
                            inscripcion
                            ?  "bg-[#990000] hover:bg-red-700 text-white text-lg"
                            : "bg-green-600  hover:bg-green-700 text-white text-lg"
                          } px-3 py-2 rounded transition-colors duration-300  hover:scale-110 active:scale-95`}
                        >
                          {inscripcion ? "Cancelar Inscripción" : "Inscribirse"}
                        </button>
                      </td>
