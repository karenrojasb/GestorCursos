const fetchCursos = async () => {
  setIsLoading(true);
  try {
    const response = await fetch("http://localhost:8090/api/cursos");
    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
    const data = await response.json();
    setCursos(data);
    setCursosFiltrados(data);

    // Extraer años únicos desde el campo Fin  
const añosUnicos = Array.from(
  new Set(
    data.map((curso: Curso) => new Date(curso.Fin).getFullYear())
  )
) as number[];

añosUnicos.sort((a, b) => b - a);
setYear(añosUnicos);


    const respOpciones = await fetch("http://localhost:8090/api/listas/Especificaciones");
    if (!respOpciones.ok) throw new Error("Error al obtener lista de especificaciones");
    const dataOpciones = await respOpciones.json();
    setOpciones(dataOpciones);

  } catch (error) {
    console.error("Error al obtener los cursos o especificaciones:", error);
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
