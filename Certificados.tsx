<thead>
  <tr>
    <th className="px-2 py-1 border text-left text-sm font-semibold w-2/6">Nombre</th>
    <th className="px-2 py-1 border text-left text-sm font-semibold w-2/6">Profesor</th>
    <th className="px-2 py-1 border text-left text-sm font-semibold w-2/6">Horarios</th>
    <th className="px-2 py-1 border text-left text-sm font-semibold w-1/6">Inscribir</th>
    <th className="px-2 py-1 border text-left text-sm font-semibold w-1/12">Estado</th>
    <th className="px-2 py-1 border text-left text-sm font-semibold w-1/12">Modalidad</th>
    <th className="px-2 py-1 border text-left text-sm font-semibold w-1/12">Periodo</th>
  </tr>
</thead>





<tr>
  <td className="px-2 py-1 border text-left w-2/6">{curso.Nombre}</td>
  <td className="px-2 py-1 border text-left w-2/6">{curso.Profesor}</td>
  <td className="px-2 py-1 border text-left w-2/6">
    <div className="space-y-1 text-sm text-gray-700">
      {formatearHorario(curso).map((h, index) => (
        <div key={index} className="flex items-center gap-2">
          <span className="font-medium text-blue-700">{h.dia}:</span>
          <span className="text-gray-800">{h.ini} - {h.fin}</span>
        </div>
      ))}
    </div>
  </td>
  <td className="px-2 py-1 border text-center w-1/6">
    <button className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded text-sm">Inscribir</button>
  </td>
  <td className="px-2 py-1 border text-left w-1/12">{curso.Estado}</td>
  <td className="px-2 py-1 border text-left w-1/12">{curso.Modalidad}</td>
  <td className="px-2 py-1 border text-left w-1/12">{curso.Periodo}</td>
</tr>