const fetchInscritosPorCurso = async (cursoId: number) => {
  try {
    const response = await fetch(`http://localhost:8090/api/cursos/inscritos`);
    if (!response.ok) throw new Error(`HTTP error ${response.status}`);
    const data: Inscrito[] = await response.json();

    const inscritosFiltrados = data.filter(inscrito => inscrito.idCur === cursoId);

    setInscritosPorCurso(prev => ({
      ...prev,
      [cursoId]: inscritosFiltrados,
    }));
  } catch (error) {
    console.error(`Error al obtener inscritos del curso ${cursoId}:`, error);
  }
};