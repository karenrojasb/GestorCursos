const fetchInscripcionesCurso = async (idCurso: number) => {
  try {
    const response = await fetch(`http://localhost:8090/api/inscripciones/docInscr/${idCurso}`);
    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
    const data = await response.json();
    setInscripcionesPorCurso(prev => ({ ...prev, [idCurso]: data }));
  } catch (error) {
    console.error(`Error al obtener inscripciones del curso ${idCurso}:`, error);
  }
};