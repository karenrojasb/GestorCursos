  // OBTENER CURSO DE BACKEND
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
    setIsLoading(false);
    fetchOpciones();
  };

  useEffect(() => {
    fetchCursos();
  }, []);

  const handleUpdate = () => {
    fetchCursos();
  };


  
  const handleChangeEspecificacion = async (
  idInscrito: number,
  idEspecificacion: number,
  idNotaExistente?: number,
  idCur?: number,
  docInscr?: string
) => {
  try {
    setGuardando(true);

    const especificacionObj = opciones.find(op => op.id === idEspecificacion);
    if (!especificacionObj) {
      alert("Especificación no encontrada.");
      return;
    }

    const descripcion = especificacionObj.Especificacion;
    const idEmpString = localStorage.getItem("id_emp");
    if (!idEmpString) {
      alert("No se encontró el id_emp en localStorage");
      return;
    }

    const idEmp = Number(idEmpString);
    const notaNumerica = idEspecificacion;

    const notaData = {
      idInscrito,
      idCurso: idCur,
      docInscr,
      idRegistro: idEmp,
      Nota: notaNumerica,
      FechaRegistro: new Date(),
    };

    let response;
    if (idNotaExistente) {
      response = await fetch(`http://localhost:8090/api/notas/${idNotaExistente}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(notaData),
      });
    } else {
      response = await fetch("http://localhost:8090/api/notas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(notaData),
      });
    }

    if (!response.ok) throw new Error("Error al guardar la nota");

    const nuevaNota = await response.json();

  

const actualizarCursoConNota = (curso: Curso) => {
  if (curso.id !== idCur) return curso;

  const inscritosArray = JSON.parse(curso.Inscritos || '[]');

  const inscritosActualizados = inscritosArray.map((inscrito: Inscrito) => {
    if (inscrito.id === idInscrito) {
      return {
        ...inscrito,
        Notas: [
          {
            ...nuevaNota,
            NotaEspecificacion: descripcion,
          },
        ],
      };
    }
    return inscrito;
  });

  return {
    ...curso,
    Inscritos: JSON.stringify(inscritosActualizados),
  };
};


    setCursos((prevCursos) => prevCursos.map(actualizarCursoConNota));
    setCursosFiltrados((prevCursos) => prevCursos.map(actualizarCursoConNota));

  } catch (error) {
    console.error("Error al guardar nota:", error);
    alert("Hubo un error al guardar la nota.");
  } finally {
    setGuardando(false);
  }
};
