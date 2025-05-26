const fetchCursos = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:8090/api/cursos");
      if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
      const data = await response.json();
      setCursos(data);
      setCursosFiltrados(data);
    } catch (error) {
      console.error("Error al obtener los cursos:", error);
    }

     const fetchOpciones = async () => {
  try {
    const respOpciones = await fetch("http://localhost:8090/api/listas/Especificaciones");
    if (!respOpciones.ok) throw new Error("Error al obtener lista de especificaciones");
    const dataOpciones = await respOpciones.json();
    console.log("Opciones recibidas:", dataOpciones); 
    setOpciones(dataOpciones);
  } catch (error) {
    console.error("Error al obtener opciones:", error);
  }
};
    setIsLoading(false);
    fetchOpciones();
  };

  useEffect(() => {
    fetchCursos();
  }, []);

  const handleUpdate = () => {
    fetchCursos();
  };
