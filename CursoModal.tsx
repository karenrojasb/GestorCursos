<h3 className="text-lg font-semibold text-gray-700">Horarios</h3>
<table className="w-full border-collapse border border-gray-300 text-center">
  <thead>
    <tr className="bg-gray-200">
      <th className="border border-gray-300 px-2 py-1">Día</th>
      <th className="border border-gray-300 px-2 py-1">Hora Inicio</th>
      <th className="border border-gray-300 px-2 py-1">Hora Fin</th>
    </tr>
  </thead>
  <tbody>
    {["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"].map((dia) => (
      <tr key={dia}>
        <td className="border border-gray-300 px-2 py-1 font-semibold">{dia}</td>
        <td className="border border-gray-300 px-2 py-1">
          <input
            type="time"
            name={`${dia}Ini`}
            value={curso[`${dia}Ini` as keyof typeof curso]}
            onChange={handleChange}
            className="w-full border p-1 rounded-lg"
          />
        </td>
        <td className="border border-gray-300 px-2 py-1">
          <input
            type="time"
            name={`${dia}Fin`}
            value={curso[`${dia}Fin` as keyof typeof curso]}
            onChange={handleChange}
            className="w-full border p-1 rounded-lg"
          />
        </td>
      </tr>
    ))}
  </tbody>
</table>