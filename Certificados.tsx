{curso.Inscritos && curso.Inscritos !== "[]" && (
  <div className="mt-2 w-full">
    <table className="min-w-full text-[0.8rem] table-fixed border border-gray-300 bg-white shadow-md rounded-lg">
      <thead>
        <tr className="bg-[#990000] text-white">
          <th colSpan={8} className="text-center py-2 text-base font-semibold border-b">
            Inscritos en este curso
          </th>
        </tr>
        <tr className="bg-gray-100 text-[#990000] font-medium">
          <th className="px-3 py-1 border">ID</th>
          <th className="px-3 py-1 border">ID Curso</th>
          <th className="px-3 py-1 border">Documento</th>
          <th className="px-3 py-1 border">Estado</th>
          <th className="px-3 py-1 border">Fecha de Inscripción</th>
          
          <th className="px-3 py-1 border">Calificador</th>
          <th className="px-3 py-1 border">Fecha de Calificación</th>
          <th className="px-3 py-1 border">Nota</th>
        </tr>
      </thead>
      <tbody>
        {JSON.parse(curso.Inscritos).map((inscrito: any) => {
          const nota = inscrito.Notas?.[0] || {};

          return (
            <tr key={inscrito.id} className="text-gray-700 text-center">
              <td className="px-3 py-1 border">{inscrito.id}</td>
              <td className="px-3 py-1 border">{inscrito.idCur}</td>
              <td className="px-3 py-1 border">{inscrito.NombreInscrito}</td>
              <td className="px-3 py-1 border">{inscrito.est ? "Activo" : "Inactivo"}</td>
              <td className="px-3 py-1 border">{new Date(inscrito.fecreg).toLocaleDateString()}</td>
              
              <td className="px-3 py-1 border">{nota.NombreRegistro ?? "—"}</td>
              <td className="px-3 py-1 border">
                {nota.FechaRegistro
                  ? new Date(nota.FechaRegistro).toLocaleDateString()
                  : "—"}
              </td>
         <select
  className="border rounded px-2 py-1 text-sm bg-white"
  value={
    
    opciones.find(op => op.Especificacion === insc.Especificacion)?.id || ""
  }
  onChange={(e) => handleChangeEspecificacion(insc.id, Number(e.target.value))}
>
  <option value="">-- Selecciona --</option>
  {opciones.map((opcion) => (
    <option key={opcion.id} value={opcion.id}>
      {opcion.Especificacion}
    </option>
  ))}
</select>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
)}
