const [inscritosPorCurso, setInscritosPorCurso] = useState<Record<number, Inscrito[]>>({});



const fetchInscritosPorCurso = async (cursoId: number) => {
  try {
    const response = await fetch(`http://localhost:8090/api/cursos/${cursoId}/inscritos`);
    if (!response.ok) throw new Error(`HTTP error ${response.status}`);
    const data: Inscrito[] = await response.json();

    setInscritosPorCurso(prev => ({
      ...prev,
      [cursoId]: data,
    }));
  } catch (error) {
    console.error(`Error al obtener inscritos del curso ${cursoId}:`, error);
  }
};





const handleVerMas = (id: number) => {
  const isExpanding = expandedCursoId !== id;
  setExpandedCursoId(isExpanding ? id : null);

  if (isExpanding && !inscritosPorCurso[id]) {
    fetchInscritosPorCurso(id);
  }
};






{/* Tabla de inscritos */}
{inscritosPorCurso[curso.id] && (
  <div className="mt-4 w-full">
    <h3 className="text-lg font-semibold text-[#990000] mb-2">Inscritos</h3>
    {inscritosPorCurso[curso.id].length > 0 ? (
      <table className="w-full table-auto border border-gray-300 text-sm">
        <thead className="bg-gray-200 text-[#990000]">
          <tr>
            <th className="border px-2 py-1">ID</th>
            <th className="border px-2 py-1">Nombre</th>
            <th className="border px-2 py-1">Nota</th>
          </tr>
        </thead>
        <tbody>
          {inscritosPorCurso[curso.id].map(inscrito => (
            <tr key={inscrito.id} className="text-center text-gray-700">
              <td className="border px-2 py-1">{inscrito.id}</td>
              <td className="border px-2 py-1">{inscrito.nombre}</td>
              <td className="border px-2 py-1">{inscrito.nota}</td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <p className="text-gray-500 italic">Este curso no tiene inscritos.</p>
    )}
  </div>
)}
