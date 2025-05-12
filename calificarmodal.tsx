import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

// Tipo para las notas
interface Nota {
  id: number;
  Nota: number;
  idInscrito: number;
  NombreCurso: string;
  ProfesorNombre: string;
}

const CalificarModal = ({ idInscrito }: { idInscrito: number }) => {
  const [nota, setNota] = useState<Nota | null>(null);
  const [nuevaNota, setNuevaNota] = useState<number | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false); // Nuevo estado para verificar si es cliente

  // Usar useEffect para asegurarte de que el componente esté montado en el cliente
  useEffect(() => {
    setIsClient(true); // Cambiar estado a true cuando el componente se haya montado
  }, []);

  const router = isClient ? useRouter() : null; // Usar useRouter solo en cliente

  // Función para obtener la nota actual
  useEffect(() => {
    const obtenerNota = async () => {
      try {
        const { data } = await axios.get(`/api/notas/${idInscrito}`);
        setNota(data);
        setNuevaNota(data.Nota); // Inicializamos con la nota actual
      } catch (err) {
        console.error("Error al obtener la nota", err);
        setError("Hubo un error al obtener la nota.");
      }
    };

    obtenerNota();
  }, [idInscrito]);

  // Función para manejar el cambio en la calificación
  const handleNotaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    if (!isNaN(value)) {
      setNuevaNota(value);
    }
  };

  // Función para actualizar la nota
  const actualizarNota = async () => {
    if (nuevaNota === undefined || nuevaNota === nota?.Nota) {
      setError("Por favor, ingresa una calificación válida.");
      return;
    }

    setLoading(true);
    try {
      await axios.put(`/api/notas/${nota?.id}`, { Nota: nuevaNota });
      setLoading(false);
      if (router) router.push("/reportes"); // Redirigir a otra página si es necesario
    } catch (err) {
      setLoading(false);
      setError("Hubo un error al actualizar la calificación.");
      console.error("Error al actualizar la nota", err);
    }
  };

  if (!nota) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="modal">
      <h2>Calificación del Curso: {nota.NombreCurso}</h2>
      <p>Profesor: {nota.ProfesorNombre}</p>
      <p>Nota Actual: {nota.Nota}</p>

      <label>
        Nueva Nota:
        <input
          type="number"
          min="0"
          max="100"
          value={nuevaNota}
          onChange={handleNotaChange}
        />
      </label>

      {error && <div style={{ color: "red" }}>{error}</div>}

      <button onClick={actualizarNota} disabled={loading}>
        {loading ? "Actualizando..." : "Actualizar Nota"}
      </button>
    </div>
  );
};

export default CalificarModal;