useEffect(() => {
  const fetchDatos = async () => {
    try {
      const respOpciones = await fetch("http://localhost:8090/api/listas/Especificaciones");
      if (!respOpciones.ok) throw new Error("Error al obtener lista de notas");
      const dataOpciones = await respOpciones.json();
      setOpciones(dataOpciones);

      const respNota = await fetch(`http://localhost:8090/api/notas/curso-inscrito?idCurso=${idCur}&idInscrito=${documento}`);
      if (respNota.ok) {
        const dataNota = await respNota.json();
        if (dataNota && dataNota.Nota !== undefined) {
          setNotaSeleccionada(Number(dataNota.Nota));
          setNotaExistenteId(dataNota.id);
          console.log("Nota cargada:", dataNota.Nota);
        }
      }
    } catch (error) {
      console.error("Error cargando datos:", error);
    }
  };

  if (idCur && documento) {
    fetchDatos();
  }
}, [idCur, documento]);