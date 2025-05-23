const [cursos, setCursos] = useState([]);
const [cursosFiltrados, setCursosFiltrados] = useState([]);
const [opciones, setOpciones] = useState([]);
const [especificacionSeleccionada, setEspecificacionSeleccionada] = useState("");
const [isLoading, setIsLoading] = useState(false);

// Función para obtener cursos y opciones
const fetchCursos = async () => {
  setIsLoading(true);
  try {
    const response = await fetch("http://localhost:8090/api/cursos");
    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
    const data = await response.json();
    setCursos(data);

    // Si hay una especificación seleccionada, filtramos
    if (especificacionSeleccionada) {
      const cursosFiltrados = data.filter(curso =>
        curso.Especificacion?.toLowerCase().includes(especificacionSeleccionada.toLowerCase())
      );
      setCursosFiltrados(cursosFiltrados);
    } else {
      setCursosFiltrados(data);
    }

  } catch (error) {
    console.error("Error al obtener los cursos:", error);
  }

  try {
    const respOpciones = await fetch("http://localhost:8090/api/listas/Especificaciones");
    if (!respOpciones.ok) throw new Error("Error al obtener lista de especificaciones");
    const dataOpciones = await respOpciones.json();
    setOpciones(dataOpciones);
  } catch (error) {
    console.error("Error al obtener opciones:", error);
  }

  setIsLoading(false);
};

// Carga inicial
useEffect(() => {
  fetchCursos();
}, []);

// Ejecutar cuando cambia la especificación
useEffect(() => {
  fetchCursos();
}, [especificacionSeleccionada]);

// Evento al cambiar la especificación en el select
const handleChangeEspecificacion = (e: React.ChangeEvent<HTMLSelectElement>) => {
  setEspecificacionSeleccionada(e.target.value);
};

// Botón opcional para recargar
const handleUpdate = () => {
  fetchCursos();
};








<select
  value={especificacionSeleccionada}
  onChange={handleChangeEspecificacion}
  className="border px-3 py-2 rounded"
>
  <option value="">-- Todas las especificaciones --</option>
  {opciones.map((opcion) => (
    <option key={opcion.id} value={opcion.Especificacion}>
      {opcion.Especificacion}
    </option>
  ))}
</select>