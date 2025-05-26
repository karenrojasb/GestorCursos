const fetchCursos = async () => {
  setIsLoading(true);
  try {
    // Traer cursos
    const response = await fetch("http://localhost:8090/api/cursos");
    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
    const data = await response.json();
    setCursos(data);
    setCursosFiltrados(data);

    // Traer opciones de especificaciones
    const respOpciones = await fetch("http://localhost:8090/api/listas/Especificaciones");
    if (!respOpciones.ok) throw new Error("Error al obtener lista de especificaciones");
    const dataOpciones = await respOpciones.json();
    console.log("Opciones recibidas:", dataOpciones);
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