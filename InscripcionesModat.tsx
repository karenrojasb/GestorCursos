
useEffect(()  => {
  async function fetcNotas() {
    try {
      const response = await fetch("http://localhost:8090/api/Notas");
      if (!response.ok) throw new Error("Error al obtener los periodos");

      const data = await response.json();
      console.log("Notas recibidas:", data);  // <-- Agrega esto
      setNota(data);
    } catch(error){
      console.error("Error cargando lista de periodos:", error);
    }
  }
  fetcNotas(); 
}, []);