import { useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";

interface CalificarModalProps {
  nombre: string;
  documento: number;
  idCur: number;
  Especificacion: string;
  idIns: number;
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
  Especificacion,
  idIns,
  onClose,
  onGuardar,
}: CalificarModalProps) {
  const [opciones, setOpciones] = useState<OpcionLista[]>([]);
  const [notaSeleccionada, setNotaSeleccionada] = useState<number | null>(null);
  const [idEmp, setIdEmp] = useState<string | null>(null);
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    const storedId = localStorage.getItem("id_emp");
    setIdEmp(storedId);
  }, []);

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const respOpciones = await fetch("http://localhost:8090/api/listas/Especificaciones");
        if (!respOpciones.ok) throw new Error("Error al obtener lista de notas");
        const dataOpciones = await respOpciones.json();
        setOpciones(dataOpciones);
      } catch (error) {
        console.error("Error cargando opciones:", error);
      }
    };

    fetchDatos();
  }, []);

  useEffect(() => {
    const fetchNotaExistente = async () => {
      try {
        const res = await fetch(`http://localhost:8090/api/notas/existe?idCurso=${idCur}&idInscrito=${documento}`);
        if (res.ok) {
          const nota = await res.json();
          if (nota?.Nota) {
            setNotaSeleccionada(Number(nota.Nota));
          }
        }
      } catch (error) {
        console.error("Error verificando nota existente:", error);
      }
    };

    if (idCur && documento) fetchNotaExistente();
  }, [idCur, documento]);

  const handleGuardar = async () => {
    if (!notaSeleccionada || !idEmp) {
      alert("Faltan datos para guardar la calificación.");
      return;
    }

    setGuardando(true);

    try {
      const responseGet = await fetch(
        `http://localhost:8090/api/notas/existe?idCurso=${idCur}&idInscrito=${documento}`
      );
      const notaExistente = responseGet.ok ? await responseGet.json() : null;

      const notaYaExiste = notaExistente && typeof notaExistente === 'object' && 'id' in notaExistente;

      if (notaYaExiste) {
        await fetch(`http://localhost:8090/api/notas/${notaExistente.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            Nota: notaSeleccionada,
            idRegistro: idEmp,
            FechaRegistro: new Date(),
          }),
        });
      } else {
        await fetch("http://localhost:8090/api/notas", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            idCurso: idCur,
            idInscrito: documento,
            Nota: notaSeleccionada,
            idRegistro: idEmp,
            FechaRegistro: new Date(),
          }),
        });
      }

      await fetch(`http://localhost:8090/api/inscripciones/${idIns}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Nota: notaSeleccionada,
          idRegistro: idEmp,
        }),
      });

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

        <p className="text-left mb-2"><strong>Nombre del Estudiante:</strong> {nombre}</p>
        <p className="text-left mb-2"><strong>Documento:</strong> {documento}</p>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Selecciona una calificación:</label>
          <select
            className="w-full border rounded px-3 py-2"
            value={notaSeleccionada ?? ""}
            onChange={(e) => setNotaSeleccionada(Number(e.target.value))}
          >
            <option value="">-- Selecciona --</option>
            {opciones.map((op) => (
              <option key={op.id} value={op.id}>{op.Especificacion}</option>
            ))}
          </select>
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={handleGuardar}
            disabled={guardando}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition hover:scale-110 active:scale-95"
          >
            {guardando ? "Guardando..." : "Guardar"}
          </button>
          <button
            onClick={onClose}
            className="bg-[#990000] text-white px-4 py-2 rounded hover:bg-red-700 transition hover:scale-110 active:scale-95"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}