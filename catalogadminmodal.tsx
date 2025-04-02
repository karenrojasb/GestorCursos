const handleGuardarEdicion = async (cursoActualizado: Curso) => {
  try {
    const response = await fetch(`http://localhost:8090/api/cursos/${cursoActualizado.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cursoActualizado),
    });

    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

    setMensajeExito("Curso actualizado correctamente");
    setTimeout(() => setMensajeExito(""), 3000);

    setCursoEditar(null);  // Cerrar el modal
    fetchCursos();  // Volver a cargar la lista actualizada desde el backend
  } catch (error) {
    console.error("Error al actualizar el curso:", error);
    alert("No se pudo actualizar el curso");
  }
};