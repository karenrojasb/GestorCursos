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
  CupoMax: number;
  Lugar: string;
  Profesor: number;
  Descripcion: string;
}

export default function CatalogoModal({ onClose }: { onClose: () => void }) {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [cursosFiltrados, setCursosFiltrados] = useState<Curso[]>([]);
  const [expandedCursoId, setExpandedCursoId] = useState<number | null>(null);
  const [busqueda, setBusqueda] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [editingCurso, setEditingCurso] = useState<Curso | null>(null);

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const response = await fetch("http://localhost:8090/api/cursos");
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }
        const data = await response.json();
        setCursos(data);
        setCursosFiltrados(data);
      } catch (error) {
        console.error("Error al obtener los cursos:", error);
      }
    };

    fetchCursos();
  }, []);

  const handleBuscar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const texto = e.target.value.toLowerCase();
    setBusqueda(texto);
    setCursosFiltrados(cursos.filter((curso) => curso.NombreCurso.toLowerCase().includes(texto)));
  };

  const handleVerMas = (id: number) => {
    setExpandedCursoId(expandedCursoId === id ? null : id);
  };

  const handleEditClick = (curso: Curso) => {
    setEditingCurso(curso);
  };

  const handleEditCurso = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCurso) return;

    try {
      const response = await fetch(`http://localhost:8090/api/cursos/${editingCurso.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingCurso),
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      alert("Curso actualizado correctamente");
      setEditingCurso(null);

      // Recargar cursos después de editar
      const updatedCursos = cursos.map((curso) =>
        curso.id === editingCurso.id ? editingCurso : curso
      );
      setCursos(updatedCursos);
      setCursosFiltrados(updatedCursos);
    } catch (error) {
      console.error("Error al actualizar el curso:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
        
        {/* Botón de cerrar */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-red-600 transition-transform duration-300 hover:rotate-90"
          onClick={onClose}
        >
          <XMarkIcon className="w-6 h-6" />
        </button>

        <h2 className="text-xl font-bold mb-4">Catálogo de Cursos</h2>

        {/* Barra de búsqueda */}
        <div className="flex items-center gap-2 mb-4">
          <button onClick={() => setIsSearchActive(!isSearchActive)} className="p-2 rounded-full bg-gray-200">
            {isSearchActive ? (
              <XMarkIcon className="h-6 w-6 text-[#990000] transition-transform rotate-180" />
            ) : (
              <MagnifyingGlassIcon className="h-6 w-6 text-[#990000]" />
            )}
          </button>
          <input
            type="text"
            placeholder="Busque el nombre del curso"
            value={busqueda}
            onChange={handleBuscar}
            className={`px-4 py-2 border rounded-full transition-all duration-500 ease-in-out 
              ${isSearchActive ? "w-96 opacity-100 bg-white shadow-md" : "w-0 opacity-0"} focus:outline-none`}
          />
        </div>

        {/* Lista de cursos */}
        <div className="space-y-2 overflow-y-auto max-h-96">
          {cursosFiltrados.length > 0 ? (
            cursosFiltrados.map((curso) => (
              <div key={curso.id} className="border-b py-2">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">{curso.NombreCurso}</span>
                  <span className="text-gray-600">{curso.Inicio || "dd/mm/aaaa"}</span>

                  <div className="flex gap-2">
                    {/* Botón Ver Más */}
                    <button
                      onClick={() => handleVerMas(curso.id)}
                      className="bg-[#990000] text-white px-4 py-1 rounded transition hover:scale-105"
                    >
                      {expandedCursoId === curso.id ? "Ver menos" : "Ver más"}
                    </button>

                    {/* Botón Editar */}
                    <button
                      onClick={() => handleEditClick(curso)}
                      className="bg-blue-500 text-white px-4 py-1 rounded transition hover:scale-105 flex items-center gap-1"
                    >
                      <PencilSquareIcon className="h-5 w-5" />
                      Editar
                    </button>
                  </div>
                </div>

                {/* Información completa del curso */}
                {expandedCursoId === curso.id && (
                  <div className="p-4 border border-gray-300 bg-gray-50 rounded-lg shadow-md mt-2">
                    <p><strong>Valor:</strong> {curso.Valor}</p>
                    <p><strong>Periodo:</strong> {curso.Periodo}</p>
                    <p><strong>Horas:</strong> {curso.Horas}</p>
                    <p><strong>Lugar:</strong> {curso.Lugar}</p>
                    <p><strong>Profesor:</strong> {curso.Profesor}</p>
                    <p><strong>Descripción:</strong> {curso.Descripcion}</p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-center py-4">No hay cursos disponibles.</p>
          )}
        </div>

        {/* Formulario de edición */}
        {editingCurso && (
          <div className="p-4 border border-gray-300 bg-gray-50 rounded-lg shadow-md mt-4">
            <h3 className="text-lg font-bold mb-2">Editar Curso</h3>
            <form onSubmit={handleEditCurso} className="space-y-2">
              <input
                type="text"
                name="NombreCurso"
                value={editingCurso.NombreCurso}
                on