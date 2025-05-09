useEffect(() => {
  const fetchDatos = async () => {
    try {
      // Obtener lista de opciones
      const respOpciones = await fetch("http://localhost:8090/api/listas/Especificaciones");
      if (!respOpciones.ok) throw new Error("Error al obtener lista de notas");
      const dataOpciones = await respOpciones.json();
      setOpciones(dataOpciones);

      // Obtener nota existente
      const respNota = await fetch(`http://localhost:8090/api/notas/${idCurso}/${documento}`);
      if (respNota.ok) {
        const notaData = await respNota.json();
        if (notaData?.Nota) {
          setNotaSeleccionada(notaData.Nota);
        }
      }
    } catch (error) {
      console.error("Error cargando datos:", error);
    }
  };

  fetchDatos();
}, [idCurso, documento]);




<select
  className="w-full border rounded px-3 py-2"
  value={notaSeleccionada ?? ""}
  onChange={(e) => setNotaSeleccionada(Number(e.target.value))}
>
  <option value="">-- Selecciona --</option>
  {opciones.map((op) => (
    <option key={op.id} value={op.id}>
      {op.Especificacion}
    </option>
  ))}
</select>
