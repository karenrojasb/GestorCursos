<div key={curso.id} className="col-span-4 border p-4 rounded-md">
  <div className="flex justify-between items-center">
    <div>
      <h2 className="text-lg font-semibold">{curso.NombreCurso}</h2>
      <p className="text-sm text-gray-600">Profesor: {curso.NombreProfesor}</p>
    </div>
    <button
      onClick={() => setExpandedCursoId(expandedCursoId === curso.id ? null : curso.id)}
      className="text-blue-500 hover:underline"
    >
      {expandedCursoId === curso.id ? "Ocultar" : "Ver más"}
    </button>
  </div>

  {expandedCursoId === curso.id && (
    <div className=" bg-gray-100 p-4 mt-4 flex flex-col justify-center overflow-x-auto min-w-[1100px]">
      <div className="w-full flex justify-center">
        <table className="min-w-full table-fixed text-[0.8rem] shadow-md rounded-lg border border-gray-300 bg-white">
          <colgroup>
            <col className="w-[16.6%]" />
            <col className="w-[16.6%]" />
            <col className="w-[16.6%]" />
            <col className="w-[16.6%]" />
            <col className="w-[16.6%]" />
            <col className="w-[16.6%]" />
          </colgroup>
          <thead>
            <tr className="bg-[#990000] text-white">
              <th colSpan={6} className="text-center py-2 text-base font-semibold border-b border-gray-300">
                Datos del Curso
              </th>
            </tr>
            <tr className="bg-gray-100 text-[#990000] font-medium">
              <th className="px-3 py-1 border">ID</th>
              <th className="px-3 py-1 border">Nombre</th>
              <th className="px-3 py-1 border">Valor</th>
              <th className="px-3 py-1 border">Público</th>
              <th className="px-3 py-1 border">Periodo</th>
              <th className="px-3 py-1 border">Cupo Máx</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-gray-700 text-center">
              <td className="px-3 py-1 border">{curso.id}</td>
              <td className="px-3 py-1 border">{curso.NombreCurso}</td>
              <td className="px-3 py-1 border">{curso.Valor || " - - "}</td>
              <td className="px-3 py-1 border">{curso.Publico}</td>
              <td className="px-3 py-1 border">{curso.Periodo}</td>
              <td className="px-3 py-1 border">{curso.CupoMax}</td>
            </tr>
            <tr className="bg-gray-100 text-[#990000] font-medium">
              <th className="px-3 py-1 border">Inicio</th>
              <th className="px-3 py-1 border">Fin</th>
              <th className="px-3 py-1 border">Horas</th>
              <th className="px-3 py-1 border">Horario</th>
              <th className="px-3 py-1 border">Lugar</th>
              <th className="px-3 py-1 border">Línea</th>
            </tr>
            <tr className="text-gray-700 text-center">
              <td className="px-3 py-1 border">{curso.Inicio}</td>
              <td className="px-3 py-1 border">{curso.Fin}</td>
              <td className="px-3 py-1 border">{curso.Horas}</td>
              <td className="px-3 py-1 border text-left">
                {formatearHorario(curso).map((h) => (
                  <div key={`${curso.id}-${h.dia}`}>
                    <strong>{h.dia}</strong> {h.ini} - {h.fin}
                  </div>
                ))}
              </td>
              <td className="px-3 py-1 border">{curso.Lugar}</td>
              <td className="px-3 py-1 border">{curso.LineaNombre}</td>
            </tr>
            <tr className="bg-gray-100 text-[#990000] font-medium">
              <th className="px-3 py-1 border">Estado</th>
              <th className="px-3 py-1 border">Modalidad</th>
              <th className="px-3 py-1 border">Profesor</th>
              <th className="px-3 py-1 border">Segundo Profesor</th>
              <th className="px-3 py-1 border">Profesor Externo</th>
              <th className="px-3 py-1 border">Unidad</th>
            </tr>
            <tr className="text-gray-700 text-center">
              <td className="px-3 py-1 border">{curso.EstadoNombre}</td>
              <td className="px-3 py-1 border">{curso.ModalidadNombre}</td>
              <td className="px-3 py-1 border">{curso.NombreProfesor}</td>
              <td className="px-3 py-1 border">{curso.SegundoProNombre}</td>
              <td className="px-3 py-1 border">{curso.Proexterno}</td>
              <td className="px-3 py-1 border">{curso.Unidad}</td>
            </tr>
            <tr className="bg-gray-100 text-[#990000] font-medium">
              <th className="px-3 py-1 border">Tipo</th>
              <th className="px-3 py-1 border">Inicio Inscripciones</th>
              <th className="px-3 py-1 border">Cierre Inscripciones</th>
              <th className="px-3 py-1 border" colSpan={3}>Descripción</th>
            </tr>
            <tr className="text-gray-700 text-center">
              <td className="px-3 py-1 border">{curso.IdTipoCurso}</td>
              <td className="px-3 py-1 border">{curso.InicioInscr}</td>
              <td className="px-3 py-1 border">{curso.FinInscr}</td>
              <td className="px-3 py-1 border text-left" colSpan={3}>{curso.Descripcion}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {inscripciones[curso.id] && inscripciones[curso.id].length > 0 ? (
        <div className="mt-4">
          <h4 className="font-semibold mb-2 text-[#990000]">Inscritos:</h4>
          <ul className="list-disc ml-5 space-y-1 text-sm">
            {inscripciones[curso.id].map((inscrito, idx) => (
              <li key={idx}>
                <strong>Documento:</strong> {inscrito.docInscr} |{" "}
                <strong>Fecha:</strong>{" "}
                {new Date(inscrito.fecreg).toLocaleDateString()}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-gray-600 italic mt-2">No hay inscritos para este curso.</p>
      )}
    </div>
  )}
</div>