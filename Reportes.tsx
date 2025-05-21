{curso.Inscritos && curso.Inscritos !== "[]" && (
  <div className="mt-2 w-full">
    <table className="min-w-full text-[0.8rem] table-fixed border border-gray-300 bg-white shadow-md rounded-lg">
      <thead>
        <tr className="bg-[#990000] text-white">
          <th colSpan={6} className="text-center py-2 text-base font-semibold border-b">
            Inscritos en este curso
          </th>
        </tr>
        <tr className="bg-gray-100 text-[#990000] font-medium">
          <th className="px-3 py-1 border">ID</th>
          <th className="px-3 py-1 border">ID Curso</th>
          <th className="px-3 py-1 border">Documento</th>
          <th className="px-3 py-1 border">Estado</th>
          <th className="px-3 py-1 border">Fecha Registro</th>
          <th className="px-3 py-1 border">Nota</th>
        </tr>
      </thead>
      <tbody>
        {JSON.parse(curso.Inscritos).map((inscrito: any) => {
          const nota = inscrito.Notas?.[0]?.Nota ?? "—";
          return (
            <tr key={inscrito.id} className="text-gray-700 text-center">
              <td className="px-3 py-1 border">{inscrito.docInscr}</td>
              <td className="px-3 py-1 border">{inscrito.idCur}</td>
              <td className="px-3 py-1 border">{nota.Nota}</td>
              <td className="px-3 py-1 border">{nota.idRegistro}</td>
              <td className="px-3 py-1 border">
                {new Date(inscrito.fecreg).toLocaleDateString()}
              </td>
              <td className="px-3 py-1 border">{nota}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
)}
