<table className="w-full text-left border border-gray-300 mt-4">
  <thead className="bg-gray-100">
    <tr>
      <th className="p-2 border-b">Documento</th>
      <th className="p-2 border-b">Fecha Inscripción</th>
      <th className="p-2 border-b">Nota</th>
      <th className="p-2 border-b">ID Registro</th>
      <th className="p-2 border-b">Fecha Registro</th>
    </tr>
  </thead>
  <tbody>
    {inscripciones[curso.id]?.map((inscrito) => (
      <tr key={inscrito.id} className="border-t hover:bg-gray-50">
        <td className="p-2">{inscrito.docInscr}</td>
        <td className="p-2">{new Date(inscrito.fecreg).toLocaleDateString()}</td>
        <td className="p-2">{inscrito.nota !== null ? inscrito.nota : <span className="text-gray-500">Sin nota</span>}</td>
        <td className="p-2">{inscrito.idRegistro !== null ? inscrito.idRegistro : <span className="text-gray-500">-</span>}</td>
        <td className="p-2">{inscrito.fechaRegistro ? new Date(inscrito.fechaRegistro).toLocaleDateString() : <span className="text-gray-500">-</span>}</td>
      </tr>
    ))}
  </tbody>
</table>