<tbody>
  {inscripciones.map((insc, index) => (
    <tr
      key={insc.id}
      className={`border-b ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
    >
      <td className="px-4 py-2">{insc.nombre}</td>
      <td className="px-4 py-2">{insc.docInscr}</td>
      <td className="px-4 py-2">
        {new Date(insc.fecreg).toLocaleDateString()}
      </td>
      <td className="px-4 py-2">
        <select
          className="border rounded px-2 py-1 text-sm bg-gray-100 cursor-not-allowed"
          value={insc.Especificacion}
          disabled
        >
          <option>{insc.Especificacion}</option>
        </select>
      </td>
    </tr>
  ))}
</tbody>