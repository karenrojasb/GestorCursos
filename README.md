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
  const [expandedCursoId, setExpandedCursoId] = useState<number | null>(null);
  const [busqueda, setBusqueda] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [editandoCurso, setEditandoCurso] = useState<Curso | null>(null);

  // Obtener cursos desde el backend
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

  useEffect(() => {
    fetchCursos();
  }, []);

  // Buscar cursos
  const handleBuscar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const texto = e.target.value.toLowerCase();
    setBusqueda(texto);
    setCursosFiltrados(cursos.filter(curso => curso.NombreCurso.toLowerCase().includes(texto)));
  };

  // Mostrar detalles del curso
  const handleVerMas = (id: number) => {
    setExpandedCursoId(expandedCursoId === id ? null : id);
  };

  // Iniciar edición
  const handleEditar = (curso: Curso) => {
    setEditandoCurso({ ...curso });
  };

  // Guardar cambios
  const handleGuardarEdicion = async () => {
    if (!editandoCurso) return;

    try {
      const response = await fetch(`http://localhost:8090/api/cursos/${editandoCurso.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editandoCurso),
      });

      if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

      await fetchCursos(); // Recargar la lista de cursos
      setEditandoCurso(null);
    } catch (error) {
      console.error("Error al guardar la edición:", error);
    }
  };

  // Actualizar estado del curso editado
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!editandoCurso) return;
    const { name, value } = e.target;

    // Convertir a número si el campo lo requiere
    const newValue = ["Valor", "Publico", "Horas", "Linea", "Estado", "Modalidad", "Unidad", "Profesor", "SegundoPro", "IdTipoCurso"].includes(name)
      ? Number(value)
      : value;

    setEditandoCurso({ ...editandoCurso, [name]: newValue });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl max-h-[80vh] overflow-y-auto">
        {/* Botón de cerrar */}
        <button className="absolute top-4 right-4 text-gray-500 hover:text-red-600 transition-transform duration-300 hover:rotate-90" onClick={onClose}>
          <XMarkIcon className="w-6 h-6" />
        </button>

        {/* Barra de búsqueda */}
        <div className="flex items-center space-x-2 mb-4">
          <button onClick={() => setIsSearchActive(!isSearchActive)} className="p-2 rounded-full bg-gray-200 transition-transform">
            {isSearchActive ? <XMarkIcon className="h-6 w-6 text-[#990000]" /> : <MagnifyingGlassIcon className="h-6 w-6 text-[#990000]" />}
          </button>
          <input
            type="text"
            placeholder="Busque el nombre del curso"
            value={busqueda}
            onChange={handleBuscar}
            className={`px-4 py-2 border rounded-full transition-all ${isSearchActive ? "w-96 opacity-100" : "w-0 opacity-0"} focus:outline-none`}
          />
        </div>

        {/* Lista de cursos */}
        <div className="space-y-2">
          {cursosFiltrados.map((curso) => (
            <div key={curso.id} className="border-b py-2 flex justify-between items-center">
              <span>{curso.NombreCurso}</span>
              <div className="flex space-x-2">
                <button onClick={() => handleVerMas(curso.id)} className="bg-[#990000] text-white px-4 py-1 rounded">Ver más</button>
                <button onClick={() => handleEditar(curso)} className="bg-[#990000] text-white px-4 py-1 rounded">
                  <PencilSquareIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal de Edición */}
      {editandoCurso && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold">Editar Curso</h2>
            {Object.keys(editandoCurso).map((key) => (
              key !== "id" && (
                <div key={key} className="mt-2">
                  <label className="block text-sm font-medium">{key}</label>
                  <input
                    type={typeof editandoCurso[key as keyof Curso] === "number" ? "number" : "text"}
                    name={key}
                    value={editandoCurso[key as keyof Curso] as string}
                    onChange={handleChange}
                    className="border p-2 w-full rounded"
                  />
                </div>
              )
            ))}
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
