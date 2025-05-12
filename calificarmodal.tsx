<CalificarModal
  nombre={inscrito.nombre}
  documento={inscrito.documento}
  idCurso={curso.id} // <--- Aquí asegúrate de que `curso.id` sea un número válido
  onClose={cerrarModal}
  onGuardar={guardarNota}
/>