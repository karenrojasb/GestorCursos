const [inscripcionesPorCurso, setInscripcionesPorCurso] = useState<{ [idCur: number]: number }>({});

useEffect(() => {
  if (!idEmp) return;
  const fetchInscripciones = async () => {
    try {
      const response = await fetch(`http://localhost:8090/api/inscripciones?docInscr=${idEmp}`);
      if (!response.ok) throw new Error("Error al obtener inscripciones");
      const data: Inscripcion[] = await response.json();

      const activas = data.filter((ins) => ins.est === true);
      setInscripciones(activas);

      // Contar por curso
      const conteo: { [idCur: number]: number } = {};
      activas.forEach((ins) => {
        conteo[ins.idCur] = (conteo[ins.idCur] || 0) + 1;
      });

      setInscripcionesPorCurso(conteo);
    } catch (error) {
      console.error("Error al obtener inscripciones:", error);
    }
  };
  fetchInscripciones();
}, [idEmp]);




<td className="border p-2">
  {(() => {
    const totalInscritos = inscripcionesPorCurso[curso.id] || 0;
    const estaInscrito = inscripciones.some(ins => ins.idCur === curso.id && ins.docInscr === idEmp);
    const inscripcionId = inscripciones.find(ins => ins.idCur === curso.id && ins.docInscr === idEmp)?.id;

    if (totalInscritos >= curso.CupoMax && !estaInscrito) {
      return <span className="text-red-500 font-semibold">Sin cupos</span>;
    }

    return (
      <button
        disabled={inscribiendo}
        onClick={() => handleInscripcion(curso.id, estaInscrito, inscripcionId)}
        className={`px-3 py-1 rounded ${
          estaInscrito
            ? "bg-red-500 hover:bg-red-600"
            : "bg-green-600 hover:bg-green-700"
        } text-white transition`}
      >
        {estaInscrito ? "Cancelar" : "Inscribirse"}
      </button>
    );
  })()}
</td>