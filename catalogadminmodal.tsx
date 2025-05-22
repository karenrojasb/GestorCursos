const fetchOpciones = async () => {
  try {
    const respOpciones = await fetch("http://localhost:8090/api/listas/Especificaciones");
    if (!respOpciones.ok) throw new Error("Error al obtener lista de especificaciones");
    const dataOpciones = await respOpciones.json();
    setOpciones(dataOpciones);
  } catch (error) {
    console.error("Error al obtener opciones:", error);
  }
};

const fetchCursos = async () => {
  setIsLoading(true);
  try {
    const [resCursos, resOpciones] = await Promise.all([
      fetch("http://localhost:8090/api/cursos"),
      fetch("http://localhost:8090/api/listas/Especificaciones"),
    ]);

    if (!resCursos.ok) throw new Error(`Error HTTP cursos: ${resCursos.status}`);
    if (!resOpciones.ok) throw new Error(`Error HTTP opciones: ${resOpciones.status}`);

    const cursos = await resCursos.json();
    const opciones = await resOpciones.json();

    setCursos(cursos);
    setCursosFiltrados(cursos);
    setOpciones(opciones);
  } catch (error) {
    console.error("Error al obtener datos:", error);
  } finally {
    setIsLoading(false);
  }
};