// FUNCIONES ASÍNCRONAS SEPARADAS

const fetchCursos = async () => {
  try {
    const response = await fetch("http://localhost:8090/api/cursos");
    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
    const data = await response.json();
    setCursos(data);
    setCursosFiltrados(data);
  } catch (error) {
    console.error("Error al obtener los cursos:", error);
  }
};

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

// LLAMADA PRINCIPAL AL CARGAR

const fetchDataInicial = async () => {
  setIsLoading(true);
  await Promise.all([fetchCursos(), fetchOpciones()]);
  setIsLoading(false);
};

// USEEFFECT PRINCIPAL

useEffect(() => {
  fetchDataInicial();
}, []);

// FUNCION PARA REFRESCAR SOLO CURSOS

const handleUpdate = () => {
  fetchCursos();
};