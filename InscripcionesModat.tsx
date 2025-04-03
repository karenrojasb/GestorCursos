{expandedCourses[Number(cursoId)] && (
  <tr>
    <td colSpan={4}>
      <div className="p-3 bg-gray-50 border border-gray-300 rounded-md shadow-md mt-2">
        <h3 className="text-md font-semibold text-[#990000] mb-2 text-center">Lista de Inscritos</h3>

        <div className="max-h-[250px] overflow-y-auto">
          <table className="w-full border-collapse">
            <thead className="bg-[#990000] text-white text-sm">
              <tr>
                <th className="p-1 text-center">Nombre</th>
                <th className="p-1 text-center">Documento</th>
                <th className="p-1 text-center">Fecha</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {inscripciones
                .filter((inscripcion) => inscripcion.est === 1)
                .map((inscripcion, index) => (
                  <tr
                    key={inscripcion.id}
                    className={`text-center ${
                      index % 2 === 0 ? "bg-gray-100" : "bg-white"
                    }`}
                  >
                    <td className="p-1">{inscripcion.nombre || "No disponible"}</td>
                    <td className="p-1">{inscripcion.docInscr}</td>
                    <td className="p-1">
                      {new Date(inscripcion.fecreg).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </td>
  </tr>
)}