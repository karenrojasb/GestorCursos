const idEmp = typeof window !== "undefined" ? localStorage.getItem("id_emp") : null;
const fetchCursos = async () => {
  setIsLoading(true);
  try {
    const responseCursos = await fetch(`http://localhost:8090/api/cursos`);
    const responseInscripciones = await fetch(`http://localhost:8090/api/inscripciones`);

    if (!responseCursos.ok || !responseInscripciones.ok) {
      throw new Error(`Error HTTP al obtener cursos o inscripciones`);
    }

    const dataCursos: Curso[] = await responseCursos.json();
    const dataInscripciones: Inscripcion[] = await responseInscripciones.json();

    // Obtener el id_emp del profesor desde localStorage
    const idEmp = typeof window !== "undefined" ? localStorage.getItem("id_emp") : null;
    const idEmpNum = idEmp ? parseInt(idEmp) : null;

    // Filtrar cursos solo si el usuario es profesor
    const cursosFiltradosPorProfesor = idEmpNum
      ? dataCursos.filter(
          curso => curso.Profesor === idEmpNum || curso.SegundoPro === idEmpNum
        )
      : dataCursos;

    // Filtrar cursos que tengan inscripciones activas
    const cursosConInscritosActivos = cursosFiltradosPorProfesor.filter(curso =>
      dataInscripciones.some(insc => insc.idCur === curso.id && insc.est === true)
    );

    setCursos(cursosConInscritosActivos);
    setCursosFiltrados(cursosConInscritosActivos);
  } catch (error) {
    console.error("Error al obtener los cursos o inscripciones:", error);
  }
  setIsLoading(false);
};
useEffect(() => {
  fetchCursos();
}, []);