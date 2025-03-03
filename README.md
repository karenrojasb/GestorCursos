"use client";
import { XMarkIcon, MagnifyingGlassIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

interface Curso {
  id: number;
  NombreCurso: string;
  Valor: number;
  Publico: number;
  Periodo: string;
  Inicio: string;
  Fin: string;
  Horas: number;
  CupoMax: string;
  Lugar: string;
  Linea: number;
  Estado: number;
  Modalidad: number;
  Unidad: number;
  Profesor: number;
  SegundoPro: number;
  Proexterno: string;
  Descripcion: string;
  IdTipoCurso: number;
}

export default function CatalogoModal({ onClose }: { onClose: () => void }) {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [cursosFiltrados, setCursosFiltrados] = useState<Curso[]>([]);
  const [editandoCurso, setEditandoCurso] = useState<Curso | null>(null);

  // OBTENER CURSOS DEL BACKEND
  const fetchCursos = async () => {
    try {
      const response = await fetch("http://localhost:8090/api/cursos");
      if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
      const data = await response.json();
      setCursos(data);
      setCursosFiltrados(data);
    } catch (error) {
      console.error("Error al obtener los cursos:", error);
    }
  };

  // CARGAR CURSOS AL MONTAR EL COMPONENTE
  useEffect(() => {
    fetchCursos();
  }, []);

  // INICIAR EDICIÓN DEL CURSO
  const handleEditar = (curso: Curso) => {
    setEditandoCurso({ ...curso });
  };

  // ACTUALIZAR ESTADO CUANDO SE CAMBIAN LOS INPUTS
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!editandoCurso) return;
    const { name, value } = e.target;

    setEditandoCurso((prev) => {
      if (!prev) return null;
      return { ...prev, [name]: isNaN(Number(value)) ? value : Number(value) };
    });
  };

  // GUARDAR LOS CAMBIOS EN EL BACKEND
  const handleGuardarEdicion = async () => {
    if (!editandoCurso) return;

    console.log("Enviando actualización:", editandoCurso);

    try {
      const response = await fetch(`http://localhost:8090/api/cursos/${editandoCurso.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editandoCurso),
      });

      if (!response.ok) {
        console.error("Error HTTP al actualizar:", response.status);
        return;
      }

      console.log("Curso actualizado con éxito");

      // Refrescar lista de cursos
      await fetchCursos();

      // Cerrar modal de edición
      setEditandoCurso(null);
    } catch (error) {
      console.error("Error al guardar la edición:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl max-h-[80vh] overflow-y-auto">
        {/* BOTÓN CERRAR */}
        <button className="absolute top-4 right-4 text-gray-500 hover:text-red-600 transition-transform duration-300 hover:rotate-90" onClick={onClose}>
          <XMarkIcon className="w-6 h-6" />
        </button>

        {/* LISTA DE CURSOS */}
        <div className="flex-1 overflow-y-auto max-h-[60vh] space-y-2">
          {cursosFiltrados.length > 0 ? (
            cursosFiltrados.map((curso) => (
              <div key={curso.id} className="border-b py-2">
                <div className="grid grid-cols-3 items-center">
                  <span className="text-left">{curso.NombreCurso}</span>

                  {/* BOTONES */}
                  <div className="flex space-x-2">
                    <button onClick={() => handleEditar(curso)} className="bg-[#990000] text-white px-4 py-1 rounded transition-transform hover:scale-110 active:scale-95">
                      <PencilSquareIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center py-4">No hay cursos disponibles.</p>
          )}
        </div>
      </div>

      {/* MODAL EDICIÓN DE CURSO */}
      {editandoCurso && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-h-[80vh] overflow-y-auto w-full max-w-md">
            <h2 className="text-lg font-bold">Editar Curso</h2>

            {/* FORMULARIO DE EDICIÓN */}
            {Object.keys(editandoCurso).map((key) => (
              key !== "id" && (
                <div key={key} className="mt-2">
                  <label className="block text-sm font-medium">{key}</label>
                  <input
                    type="text"
                    name={key}
                    value={(editandoCurso as any)[key]}
                    onChange={handleChange}
                    className="border p-2 w-full rounded"
                  />
                </div>
              )
            ))}

            {/* BOTONES */}
            <div className="mt-4 flex space-x-2">
              <button onClick={handleGuardarEdicion} className="bg-[#990000] text-white px-4 py-2 rounded">Guardar</button>
              <button onClick={() => setEditandoCurso(null)} className="bg-gray-700 text-white px-4 py-2 rounded">Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
  