const fetchInscripciones = async () => {
  try {
    const idProfesor = localStorage.getItem('id_emp');
    if (!idProfesor) {
      console.error('ID del profesor no encontrado en localStorage');
      return;
    }
    const response = await fetch(`http://localhost:8090/api/inscripciones/cursos/${idProfesor}`);
    if (!response.ok) throw new Error("Error al obtener inscripciones");

    const data: Inscripcion[] = await response.json();
    console.log("Datos recibidos en el frontend:", JSON.stringify(data, null, 2));

    setInscripciones(data);
    setInscripcionesFiltradas(data);
    setIsLoading(false);
  } catch (error) {
    console.error('Error al obtener cursos del profesor:', error);
    setIsLoading(false);
  }
};



const filtrados = inscripciones.filter((inscripcion) => {
  const cursoNombre =
    inscripcion.Cursos?.NombreCurso ||
    inscripcion.curso?.NombreCurso ||
    inscripcion.NombreCurso ||
    "";
  console.log("Curso Nombre:", cursoNombre);

  const fechaRegistro = new Date(inscripcion.fecreg).toLocaleDateString();
  console.log("Fecha Registro:", fechaRegistro);

  const idCurso =
    String(inscripcion.idCur || inscripcion.Cursos?.id || inscripcion.curso?.id || "");
  console.log("ID Curso:", idCurso);

  const nombreInscrito = String(inscripcion.nombre || "");
  console.log("Nombre Inscrito:", nombreInscrito);

  const docInscrito = String(inscripcion.docInscr || "");
  console.log("Documento Inscrito:", docInscrito);

  return (
    idCurso.includes(texto) ||
    cursoNombre.toLowerCase().includes(texto) ||
    fechaRegistro.includes(texto) ||
    nombreInscrito.toLowerCase().includes(texto) ||
    docInscrito.includes(texto)
  );
});