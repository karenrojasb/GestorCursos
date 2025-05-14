
import { useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";

interface CalificarModalProps {
  nombre: string;
  documento: number;
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
  const [notaExistenteId, setNotaExistenteId] = useState<number | null>(null); // NUEVO

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

        const respNota = await fetch(`http://localhost:8090/api/notas/curso-inscrito?idCurso=${idCur}&idInscrito=${documento}`);
        if (respNota.ok) {
          const dataNota = await respNota.json();
          if (dataNota && dataNota.Nota !== undefined) {
            setNotaSeleccionada(Number(dataNota.Nota));
            setNotaExistenteId(dataNota.id); // Guarda el id para actualizar
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
    if (notaSeleccionada === null || isNaN(notaSeleccionada)) {
      alert("Por favor selecciona una nota válida");
      return;
    }
  
    if (!idEmp) {
      alert("Error: ID de empleado no encontrado.");
      return;
    }
  
    setGuardando(true);
  
    try {
      // Paso 1: Consultar si ya existe nota
      const responseGet = await fetch(
        `http://localhost:8090/api/notas/curso-inscrito?idCurso=${idCur}&idInscrito=${documento}`
      );
  
      if (!responseGet.ok) {
        throw new Error("Error al verificar existencia de nota.");
      }
  
      const notaExistente = await responseGet.json();
  
      if (notaExistente && notaExistente.id) {
        // Paso 2: Si existe, actualizar
        const responsePut = await fetch(`http://localhost:8090/api/notas/${notaExistente.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Nota: notaSeleccionada,
            idRegistro: Number(idEmp),
            FechaRegistro: new Date(),
          }),
        });
  
        if (!responsePut.ok) {
          throw new Error("Error al actualizar la nota.");
        }
      } else {
        // Paso 3: Si no existe, crear
        const responsePost = await fetch("http://localhost:8090/api/notas", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idCurso: idCur,
            idInscrito: documento,
            idRegistro: Number(idEmp),
            Nota: notaSeleccionada,
            FechaRegistro: new Date(),
          }),
        });
  
        if (!responsePost.ok) {
          throw new Error("Error al crear la nota.");
        }
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

        <br></br>      
        <p className="text-left mb-2"><strong>Nombre del Estudiante:</strong> {nombre}</p>
        
        <p className="text-left mb-2"><strong>Documento:</strong> {documento}</p>
      

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
            className="bg-[#990000] text-white px-4 py-2 rounded hover:bg-red-700 transition hover:scale-110 active:scale-95"
          >
            {guardando ? "Guardando..." : "Guardar"}
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition hover:scale-110 active:scale-95"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
