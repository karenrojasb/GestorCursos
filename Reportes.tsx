const handleVerMas = async (id: number) => {
  if (expandedCursoId === id) {
    setExpandedCursoId(null);
  } else {
    setExpandedCursoId(id);
    if (!inscripcionesPorCurso[id]) {
      await fetchInscripcionesCurso(id); // Llama solo si no están ya en el estado
    }
  }
};