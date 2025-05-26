<tbody>
  {inscripciones[curso.id]?.map((inscrito) => (
    <tr key={inscrito.id} className="border-t">
      <td className="p-2">{inscrito.docInscr}</td>
      <td className="p-2">{new Date(inscrito.fecreg).toLocaleDateString()}</td>
      <td className="p-2">
        {inscrito.nota !== null ? (
          <>
            <span className="font-bold">Nota:</span> {inscrito.nota}
            <br />
            <small>ID Registro: {inscrito.idRegistro}</small>
            <br />
            <small>Fecha Registro: {new Date(inscrito.fechaRegistro).toLocaleDateString()}</small>
          </>
        ) : (
          <span className="text-gray-500">Sin nota</span>
        )}
      </td>
    </tr>
  ))}
</tbody>