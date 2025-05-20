 const fetchCursos = async () => {
  setIsLoading(true);
  try {
    // 1. Obtener cursos completos
    const response = await fetch("http://localhost:8090/api/cursos");
    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
    const cursosData = await response.json();

    // 2. Obtener los inscritos por curso (en otra ruta)
    const inscritosResponse = await fetch("http://localhost:8090/api/inscritos-por-curso");
    if (!inscritosResponse.ok) throw new Error(`Error HTTP: ${inscritosResponse.status}`);
    const inscritosData = await inscritosResponse.json(); // [{ idCurso: 1, inscritos: [...] }, ...]

    // 3. Mezclar inscritos con los cursos
    const cursosConInscritos = cursosData.map((curso) => {
      const inscritosCurso = inscritosData.find((i) => i.idCurso === curso.id)?.inscritos || [];
      return { ...curso, inscritos: inscritosCurso };
    });

    setCursos(cursosConInscritos);
    setCursosFiltrados(cursosConInscritos);
  } catch (error) {
    console.error("Error al obtener los cursos o inscritos:", error);
  } finally {
    setIsLoading(false);
  }
};

useEffect(() => {
  fetchCursos();
}, []);

const handleUpdate = () => {
  fetchCursos();
};