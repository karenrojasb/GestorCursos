import React, { useState } from "react";

interface CursoModalProps {
  onClose: () => void;
}

const CursoModal: React.FC<CursoModalProps> = ({ onClose }) => {
  // Estado para manejar los datos del formulario
  const [curso, setCurso] = useState({
    nombre_curso: "",
    valor: "",
    público: "",
    periodo: "",
    inicio: "",
    fin: "",
    horas: "",
  });

  // Manejar cambios en los inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurso({ ...curso, [e.target.name]: e.target.value });
  };

  // Enviar datos al backend
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8090/api/cursos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(curso),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error al guardar el curso:", errorData);
        alert("Error: " + (errorData.message || "No se pudo guardar el curso"));
        return;
      }

      alert("Curso guardado con éxito");
      onClose(); // Cierra el modal después de guardar
    } catch (error) {
      console.error("Error en la solicitud:", error);
      alert("Error en la conexión con el servidor");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl flex flex-col max-h-[80vh] overflow-y-auto">
        {/* Botón de cerrar */}
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-red-600">
          ✖
        </button>

        <h2 className="text-xl font-bold mb-6 text-center text-[#990000]">Crear Curso</h2>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block font-semibold">Nombre del Curso:</label>
          <input
            type="text"
            name="nombre_curso"
            value={curso.nombre_curso}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <label className="block font-semibold">Valor:</label>
          <input
            type="number"
            name="valor"
            value={curso.valor}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <label className="block font-semibold">Público:</label>
          <input
            type="text"
            name="público"
            value={curso.público}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <label className="block font-semibold">Periodo:</label>
          <input
            type="text"
            name="periodo"
            value={curso.periodo}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <label className="block font-semibold">Fecha de Inicio:</label>
          <input
            type="date"
            name="inicio"
            value={curso.inicio}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <label className="block font-semibold">Fecha de Fin:</label>
          <input
            type="date"
            name="fin"
            value={curso.fin}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <label className="block font-semibold">Horas:</label>
          <input
            type="number"
            name="horas"
            value={curso.horas}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <button
            type="submit"
            className="mt-4 w-full bg-[#990000] text-white py-2 rounded-lg hover:scale-105 transition"
          >
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
};

export default CursoModal;