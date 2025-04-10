
// calificarmodal.tsx
import React, { useState } from "react";

interface CalificarModalProps {
  nombre: string;
  documento: string;
  onClose: () => void;
  onGuardar: (notaTexto: string) => void;
}

const CalificarModal: React.FC<CalificarModalProps> = ({
  nombre,
  documento,
  onClose,
  onGuardar,
}) => {
  const [nota, setNota] = useState("");

  const handleGuardar = () => {
    if (!nota.trim()) {
      alert("Ingrese una nota válida");
      return;
    }

    onGuardar(nota);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[400px] max-w-full text-center">
        <h2 className="text-2xl font-bold text-[#990000] mb-4">
          Calificar a {nombre}
        </h2>

        <div className="mb-4">
          <label htmlFor="nota" className="block text-sm font-medium mb-1">
            Nota:
          </label>
          <input
            type="number"
            id="nota"
            value={nota}
            onChange={(e) => setNota(e.target.value)}
            className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#990000]"
            placeholder="Ej: 95"
            min={0}
            max={100}
          />
        </div>

        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={handleGuardar}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition"
          >
            Guardar
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded transition"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CalificarModal;
