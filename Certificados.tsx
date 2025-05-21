const [cursos, setCursos] = useState([]);
const [cursosFiltrados, setCursosFiltrados] = useState([]);
const [isLoading, setIsLoading] = useState(false);
const [especificaciones, setEspecificaciones] = useState([]);

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
  setIsLoading(false);
};

const fetchEspecificaciones = async () => {
  try {
    const response = await fetch("http://localhost:8090/api/listas/especificacion");
    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
    const data = await response.json();
    setEspecificaciones(data);
  } catch (error) {
    console.error("Error al obtener las especificaciones:", error);
  }
};

useEffect(() => {
  fetchCursos();
  fetchEspecificaciones();
}, []);

const handleUpdate = () => {
  fetchCursos();
};