<table className="w-full text-sm text-left">
  <thead className="bg-gray-200">
    <tr>
      <th className="px-4 py-2">Nombre</th>
      <th className="px-4 py-2">Inicio</th>
      <th className="px-4 py-2">Estado</th> {/* NUEVO */}
      <th className="px-4 py-2">Acciones</th>
    </tr>
  </thead>
  <tbody>
    {cursosFiltrados.map((curso) => (
      <tr key={curso.id} className="border-b">
        <td className="px-4 py-2">{curso.NombreCurso}</td>
        <td className="px-4 py-2">{curso.Inicio}</td>
        <td className="px-4 py-2">{curso.EstadoNombre}</td> {/* NUEVO */}
        <td className="px-4 py-2 flex gap-2">
          {/* Aquí van los íconos de editar, eliminar, exportar */}
        </td>
      </tr>
    ))}
  </tbody>
</table>