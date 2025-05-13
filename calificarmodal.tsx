
  useEffect(() => {
    const fetchDatos = async () => {
      try {
        // Obtener id_emp desde localStorage
        const userData = localStorage.getItem("usuario");
        if (userData) {
          const usuario = JSON.parse(userData);
          setIdEmp(usuario?.id_emp ?? null);
        }

        // Obtener lista de notas
        const respOpciones = await fetch("http://localhost:8090/api/listas/Especificaciones");
        if (!respOpciones.ok) throw new Error("Error al obtener lista de notas");
        const dataOpciones = await respOpciones.json();
        setOpciones(dataOpciones);

        // Obtener nota actual del inscrito (opcional)
        const respNota = await fetch(`http://localhost:8090/api/notas`);
        if (respNota.ok) {
          const dataNota = await respNota.json();
          if (dataNota?.Nota) {
            setNotaSeleccionada(dataNota.Nota);
          }
        }
      } catch (error) {
        console.error("Error cargando datos:", error);
      }
    };

    fetchDatos();
  }, [idCur, documento]