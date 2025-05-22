<select
  value={inscrito.idNotas || ""}
  onChange={(e) => handleChangeEspecificacion(inscrito.id, parseInt(e.target.value), curso.id)}
  className="border p-1 rounded"
>
  <option value="">Seleccionar</option>
  {opciones.map(op => (
    <option key={op.id} value={op.id}>{op.Especificacion}</option>
  ))}
</select>





const handleChangeEspecificacion = async (
  idInscripcion: number,
  idEspecificacion: number,
  idCurso: number
) => {
  try {
    setGuardando(true);

    // Buscar la especificación seleccionada
    const especificacionObj = opciones.find((op) => op.id === idEspecificacion);
    if (!especificacionObj) {
      alert("Especificación no encontrada.");
      return;
    }

    const descripcion = especificacionObj.Especificacion;

    // Obtener ID del evaluador desde localStorage
    const idEmpString = localStorage.getItem("id_emp");
    if (!idEmpString) {
      alert("No se encontró el ID del evaluador.");
      return;
    }
    const idEmp = Number(idEmpString);

    // Buscar curso y su inscrito
    const cursoActual = cursos.find((curso) => curso.id === idCurso);
    if (!cursoActual || !cursoActual.Inscritos) {
      alert("Curso no encontrado o sin inscritos.");
      return;
    }

    const inscritos: Inscrito[] = JSON.parse(cursoActual.Inscritos);
    const inscrito = inscritos.find((i) => i.id === idInscripcion);
    if (!inscrito) {
      alert("Inscrito no encontrado.");
      return;
    }

    const nota = inscrito.Notas?.[0];
    const notaData = {
      idCurso: cursoActual.id,
      idInscrito: inscrito.docInscr,
      idRegistro: idEmp,
      Nota: idEspecificacion,
      NotaEspecificacion: descripcion,
      FechaRegistro: new Date(),
    };

    let response;

    if (nota?.idRegistro) {
      // Actualizar nota existente
      response = await fetch(`http://localhost:8090/api/notas/${nota.idRegistro}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(notaData),
      });
    } else {
      // Crear nueva nota
      response = await fetch("http://localhost:8090/api/notas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(notaData),
      });
    }

    if (!response.ok) throw new Error("Error al guardar la nota");

    // Actualizar la lista de cursos tras la edición
    await fetchCursos();
  } catch (error) {
    console.error("Error al guardar la nota:", error);
    alert("Ocurrió un error al guardar la nota.");
  } finally {
    setGuardando(false);
  }
};