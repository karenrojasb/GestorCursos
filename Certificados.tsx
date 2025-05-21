const handleChangeEspecificacion = async (idInscripcion: number, nuevaEspecificacion: string) => {
  const inscripcion = inscripciones.find((i) => i.id === idInscripcion);
  if (!inscripcion) return;

  try {
    setGuardando(true);

    const nuevaNota = {
      idInscrito: inscripcion.id,
      idCurso: inscripcion.idCur,
      Especificacion: nuevaEspecificacion,
      Nota: 0, // puedes pedirle al usuario que ingrese esto aparte si es necesario
    };

    const response = await fetch("http://localhost:8090/api/notas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nuevaNota),
    });

    if (!response.ok) throw new Error("Error al guardar la nota");

    // Actualizar la UI
    setInscripciones((prev) =>
      prev.map((i) =>
        i.id === idInscripcion ? { ...i, Especificacion: nuevaEspecificacion } : i
      )
    );
  } catch (error) {
    console.error("Error al guardar nota:", error);
  } finally {
    setGuardando(false);
  }
};
