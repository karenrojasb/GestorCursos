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

    const nuevaNota = {
      idCurso: inscripcion.idCur,
      idInscrito: inscripcion.id,
      idRegistro: idEmp,
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








<select
  className="border rounded px-2 py-1 text-sm bg-white"
  value={insc.Especificacion || ""}
  onChange={(e) => handleChangeEspecificacion(insc.id, e.target.value)}
>
  <option value="">-- Selecciona --</option>
  {opciones.map((opcion) => (
    <option key={opcion.id} value={opcion.Especificacion}>
      {opcion.Especificacion}
    </option>
  ))}
</select>