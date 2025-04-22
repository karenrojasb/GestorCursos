const [idProfesor, setIdProfesor] = useState<number | null>(null);

useEffect(() => {
  const id = localStorage.getItem("id_emp");
  if (id) setIdProfesor(Number(id));
}, []);



Cursos?: {
  id: number;
  NombreCurso: string;
  id_emp: number; // este campo indica quién es el profesor del curso
}


useEffect(() => {
  const fetchInscripciones = async () => {
    try {
      const response = await fetch("http://localhost:8090/api/inscripciones");
      if (!response.ok) throw new Error("Error al obtener inscripciones");

      const data: Inscripcion[] = await response.json();

      // Filtrar por id del profesor actual
      const idProfesor = localStorage.getItem("id_emp");

      const cursosDelProfesor = data.filter((insc) =>
        insc.Cursos?.id_emp === Number(idProfesor)
      );

      setTimeout(() => {
        setInscripciones(cursosDelProfesor);
        setInscripcionesFiltradas(cursosDelProfesor);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error al obtener inscripciones:", error);
      setIsLoading(false);
    }
  };

  fetchInscripciones();
}, []);



const cursosDelProfesor = data.filter((insc) =>
  insc.Cursos?.id_emp === Number(idProfesor) || insc.Cursos?.segundo_prof === Number(idProfesor)
);



