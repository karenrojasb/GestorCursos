useEffect(() => {
  const fetchInscripcionesPorProfesor = async () => {
    if (!idEmp) return;

    try {
      const response = await fetch(`http://localhost:8090/api/inscripciones/cursos/${idEmp}`);
      if (!response.ok) throw new Error("Error al obtener inscripciones por profesor");

      const data: Inscripcion[] = await response.json();
      console.log("Inscripciones por profesor:", data);

      setTimeout(() => {
        setInscripciones(data);
        setInscripcionesFiltradas(data);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error al obtener inscripciones por profesor:", error);
      setIsLoading(false);
    }
  };

  fetchInscripcionesPorProfesor();
}, [idEmp]);