// components/CalificarModal.tsx
import { XMarkIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";

interface CalificarModalProps {
  onClose: () => void;
  nombre: string;
  documento: string;
  onGuardar: (nota: string) => void;
}

const CalificarModal = ({ onClose, nombre, documento, onGuardar }: CalificarModalProps) => {
  const [nuevaNota, setNuevaNota] = useState("");

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-[400px] relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-[#990000] transition-transform duration-300 hover:rotate-90">
        <XMarkIcon className="h-6 w-6" />
        </button>
        <h2 className="text-xl font-semibold mb-4 text-[#990000]">Calificar</h2>
        <p><strong>Nombre:</strong> {nombre}</p>
        <p><strong>Documento:</strong> {documento}</p>

        <input
          type="text"
          placeholder="Escribe la nota"
          value={nuevaNota}
          onChange={(e) => setNuevaNota(e.target.value)}
          className="w-full border px-3 py-2 rounded-md mt-3"
        />

        <button
          onClick={() => {
            onGuardar(nuevaNota);
            onClose();
          }}
          className="mt-4 bg-[#990000] text-white px-4 py-2 rounded-md hover:bg-red-700"
        >
          Guardar Nota
        </button>
      </div>
    </div>
  );
};

export default CalificarModal;
