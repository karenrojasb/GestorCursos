const fetchCursos = async (idEmp: number) => {
  try {
    const response = await fetch(`http://localhost:8090/api/cursos/usuario/${idEmp}`);
    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
    
    const data = await response.json();
    const cursosActivos = Array.isArray(data) ? data : data.cursos || [];

    const hoy = new Date();

    const cursosFiltrados = cursosActivos.filter(
      (curso: Curso) => !curso.FinInscr || new Date(curso.FinInscr) >= hoy
    );

    setCursos(cursosFiltrados);
    setCursosFiltrados(cursosFiltrados);
    setIsLoading(false);
  } catch (error) {
    console.error("Error al obtener los cursos:", error);
    setIsLoading(false);
  }
};