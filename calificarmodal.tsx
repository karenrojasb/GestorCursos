useEffect(() => {
  const fetchDatos = async () => {
    try {
      const respOpciones = await fetch("http://localhost:8090/api/listas/Especificaciones");
      if (!respOpciones.ok) throw new Error("Error al obtener lista de notas");
      const dataOpciones = await respOpciones.json();
      setOpciones(dataOpciones);
    } catch (error) {
      console.error("Error cargando datos:", error);
    }
  };

  fetchDatos();
}, []); // <-- Este array debe permanecer así: vacío