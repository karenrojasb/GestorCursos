
  const fetchCursos = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:8090/api/cursos`);
      if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
      const data: Curso[] = await response.json();
  
      // Si hay idEmp, filtrar los cursos donde Profesor coincida
      if (idEmp !== null) {
        const cursosFiltradosPorProfesor = data.filter(curso => curso.Profesor === idEmp);
        setCursos(cursosFiltradosPorProfesor);
        setCursosFiltrados(cursosFiltradosPorProfesor);
      } else {
        setCursos(data);
        setCursosFiltrados(data);
      }
    } catch (error) {
      console.error("Error al obtener los cursos:", error);
    }
    setIsLoading(false);
  };
  
