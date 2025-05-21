const handleChangeEspecificacion = async (
  idInscripcion: number,
  nuevaEspecificacion: string
) => {
  const inscripcion = inscripciones.find((i) => i.id === idInscripcion);
  if (!inscripcion) return;

  try {
    setGuardando(true);

    if (!nuevaEspecificacion || isNaN(Number(nuevaEspecificacion))) {
      alert("Selecciona una especificación válida.");
      return;
    }

    // Leer id_emp del localStorage aquí
    const idEmpString = localStorage.getItem("id_emp");
    if (!idEmpString) {
      alert("No se encontró el id_emp en localStorage");
      setGuardando(false);
      return;
    }
    const idEmp = Number(idEmpString);

   const valorNota = opciones.find(op => op.id === Number(nuevaEspecificacion))?.Especificacion;

if (!valorNota || isNaN(Number(valorNota))) {
  alert("La especificación seleccionada no contiene una nota válida.");
  setGuardando(false);
  return;
}

const nuevaNota = {
  idCurso: inscripcion.idCur,
  idInscrito: inscripcion.docInscr,
  idRegistro: idEmp,
  nota: Number(valorNota),
  FechaRegistro: new Date(),
};

    const response = await fetch("http://localhost:8090/api/notas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevaNota),
    });

    if (!response.ok) throw new Error("Error al guardar la nota");

    setInscripciones((prev) =>
      prev.map((i) =>
        i.id === idInscripcion
          ? { ...i, Especificacion: nuevaEspecificacion }
          : i
      )
    );
  } catch (error) {
    console.error("Error al guardar nota:", error);
    alert("Hubo un error al guardar la nota.");
  } finally {
    setGuardando(false);
  }
};
