const fetchEspecificaciones = async () => {
  try {
    const response = await fetch("http://localhost:8090/api/listas/especificacion");
    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
    const data = await response.json();
    setEspecificaciones(data); // Asumo que es un array de strings
  } catch (error) {
    console.error("Error al obtener especificaciones:", error);
  }
};


{curso.Inscritos && curso.Inscritos !== "[]" && (
  <div className="mt-2 w-full">
    <table className="min-w-full text-[0.8rem] table-fixed border border-gray-300 bg-white shadow-md rounded-lg">
      <thead>
        <tr className="bg-[#990000] text-white">
          <th colSpan={9} className="text-center py-2 text-base font-semibold border-b">
            Inscritos en este curso
          </th>
        </tr>
        <tr className="bg-gray-100 text-[#990000] font-medium">
          {/* ... otras cabeceras ... */}
          <th className="px-3 py-1 border">Nota</th>  {/* Aquí va el desplegable */}
          {/* ... otras columnas ... */}
        </tr>
      </thead>
      <tbody>
        {JSON.parse(curso.Inscritos).map((inscrito: Inscrito) => (
          <tr key={inscrito.id}>
            {/* ... otras columnas */}
            <td className="px-3 py-1 border">
              <select
                defaultValue={inscrito.Notas?.[0]?.NotaEspecificacion || ""}
                className="border rounded px-2 py-1 w-full"
                onChange={(e) => {
                  // Aquí puedes implementar el cambio y guardarlo en backend si quieres
                  console.log(`Nota especificacion seleccionada para inscrito ${inscrito.id}:`, e.target.value);
                }}
              >
                <option value="">Seleccione especificación</option>
                {especificaciones.map((esp) => (
                  <option key={esp} value={esp}>
                    {esp}
                  </option>
                ))}
              </select>
            </td>
            {/* ... otras columnas */}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}