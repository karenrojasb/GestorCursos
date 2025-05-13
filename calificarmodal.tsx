import { useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";

interface CalificarModalProps {
  nombre: string;
  documento: string;
  idCur: number;
  onClose: () => void;
  onGuardar: (nota: string) => void;
}

interface OpcionLista {
  id: number;
  Especificacion: string;
}

export default function CalificarModal({
  nombre,
  documento,
  idCur,
  onClose,
  onGuardar,
}: CalificarModalProps) {
  const [opciones, setOpciones] = useState<OpcionLista[]>([]);
  const [notaSeleccionada, setNotaSeleccionada] = useState<number | null>(null);
  const [idEmp, setIdEmp] = useState<string | null>(null);
  const [guardando, setGuardando] = useState(false);

  // Obtener el id_emp desde localStorage solo en cliente
  useEffect(() => {
    const storedId = localStorage.getItem("id_emp");
    setIdEmp(storedId);
  }, []);

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        // Obtener opciones de notas
        const respOpciones = await fetch("http://localhost:8090/api/listas/Especificaciones");
        if (!respOpciones.ok) throw new Error("Error al obtener lista de notas");
        const dataOpciones = await respOpciones.json();
        setOpciones(dataOpciones);

        // Obtener nota actual del inscrito en este curso
        const respNota = await fetch(`http://localhost:8090/api/notas?curso=${idCur}&inscrito=${documento}`);
        if (respNota.ok) {
          const dataNota = await respNota.json();
          if (dataNota?.Nota) {
            setNotaSeleccionada(dataNota.Nota);
          }
        }
      } catch (error) {
        console.error("Error cargando datos:", error);
      }
    };

    if (idCur && documento) {
      fetchDatos();
    }
  }, [idCur, documento]);

  const handleGuardar = async () => {
    if (!notaSeleccionada) {
      alert("Por favor selecciona una nota");
      return;
    }

    if (!idEmp) {
      alert("Error: ID de empleado no encontrado.");
      return;
    }

    setGuardando(true);

    try {
      const response = await fetch("http://localhost:8090/api/Notas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idCurso: idCur,
          idInscrito: documento,
          idRegistro: idEmp,
          Nota: notaSeleccionada,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error al guardar nota:", errorData);
        throw new Error("Error al guardar la nota");
      }

      onGuardar(String(notaSeleccionada));
      onClose();
    } catch (error) {
      console.error("Error al guardar nota:", error);
      alert("Hubo un error al guardar la nota.");
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-[400px] relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-[#990000] transition-transform duration-300 transform hover:rotate-90 hover:scale-110"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
        <h2 className="text-2xl font-semibold text-[#990000] mb-4 text-center">Calificar</h2>

        <p className="text-center mb-2"><strong>Id Curso:</strong> {idCur}</p>
        <p className="text-center mb-2"><strong>Nombre:</strong> {nombre}</p>
        <p className="text-center mb-2"><strong>Documento:</strong> {documento}</p>
        <p className="text-center mb-4"><strong>Empleado actual:</strong> {idEmp ?? "No disponible"}</p>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Selecciona una calificación:
          </label>
          <select
            className="w-full border rounded px-3 py-2"
            value={notaSeleccionada ?? ""}
            onChange={(e) => setNotaSeleccionada(Number(e.target.value))}
          >
            <option value="">-- Selecciona --</option>
            {opciones.map((op) => (
              <option key={op.id} value={op.id}>
                {op.Especificacion}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={handleGuardar}
            disabled={guardando}
            className="bg-[#990000] text-white px-4 py-2 rounded hover:bg-red-700 transition hover:scale-110 active:scale-95 "
          >
            {guardando ? "Guardando..." : "Guardar"}
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition hover:scale-110 active:scale-95 "
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}