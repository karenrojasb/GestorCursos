const handleChangeEspecificacion = async (
  idInscripcion: number,
  nuevaEspecificacion: string,
  idEmp: number // nombre corregido aquí
) => {
  const inscripcion = inscripciones.find((i) => i.id === idInscripcion);
  if (!inscripcion) return;

  try {
    setGuardando(true);

    if (!nuevaEspecificacion || isNaN(Number(nuevaEspecificacion))) {
      alert("Selecciona una especificación válida.");
      return;
    }

    const nuevaNota = {
      idCurso: inscripcion.idCur,
      idInscrito: inscripcion.id,
      idRegistro: idEmp,   // aquí usas idEmp
      nota: Number(nuevaEspecificacion),
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








onChange={(e) =>
  handleChangeEspecificacion(insc.id, e.target.value, insc.idEmp)
}