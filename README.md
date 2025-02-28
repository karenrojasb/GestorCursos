"use client";
import { XMarkIcon, MagnifyingGlassIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

// Definimos la interfaz Curso con las propiedades correctas
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

export default function CatalogoAdminModal({ onClose }: { onClose: () => void }) {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [cursosFiltrados, setCursosFiltrados] = useState<Curso[]>([]);
  const [expandedCursoId, setExpandedCursoId] = useState<number | null>(null);
  const [busqueda, setBusqueda] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [editandoCurso, setEditandoCurso] = useState<Curso | null>(null);

  useEffect(() => {
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

    fetchCursos();
  }, []);

  const handleBuscar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const texto = e.target.value.toLowerCase();
    setBusqueda(texto);
    setCursosFiltrados(
      cursos.filter((curso) => curso.NombreCurso.toLowerCase().includes(texto))
    );
  };

  const handleVerMas = (id: number) => {
    setExpandedCursoId(expandedCursoId === id ? null : id);
  };

  const handleEditar = (curso: Curso) => {
    setEditandoCurso({ ...curso });
  };

  const handleGuardarEdicion = async () => {
    if (!editandoCurso) return;

    console.log("Datos enviados al backend:", editandoCurso); // 👀 Verifica los datos

    try {
      const response = await fetch(`http://localhost:8090/api/cursos/${editandoCurso.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...editandoCurso,
          Valor: Number(editandoCurso.Valor),
          Publico: Number(editandoCurso.Publico),
          Horas: Number(editandoCurso.Horas),
          CupoMax: Number(editandoCurso.CupoMax),
          Linea: Number(editandoCurso.Linea),
          Estado: Number(editandoCurso.Estado),
          Modalidad: Number(editandoCurso.Modalidad),
          Unidad: Number(editandoCurso.Unidad),
          Profesor: Number(editandoCurso.Profesor),
          SegundoPro: Number(editandoCurso.SegundoPro),
          IdTipoCurso: Number(editandoCurso.IdTipoCurso),
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error HTTP: ${response.status} - ${errorText}`);
      }

      // Actualizar la lista de cursos con la nueva info
      const updatedCursos = cursos.map((c) => (c.id === editandoCurso.id ? editandoCurso : c));
      setCursos(updatedCursos);
      setCursosFiltrados(updatedCursos);
      setEditandoCurso(null);
    } catch (error) {
      console.error("Error al guardar la edición:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl h-[700px] flex flex-col">
        {/* BARRA DE BÚSQUEDA */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <button onClick={() => setIsSearchActive(!isSearchActive)} className="p-2 rounded-full bg-gray-200 transition-transform duration-500 ease-in-out">
              {isSearchActive ? (
                <XMarkIcon className="h-6 w-6 text-[#990000] transition-transform rotate-180" />
              ) : (
                <MagnifyingGlassIcon className="h-6 w-6 text-[#990000] transition-transform" />
              )}
            </button>
            <input
              type="text"
              placeholder="Buscar curso..."
              value={busqueda}
              onChange={handleBuscar}
              className={`px-4 py-2 border rounded-full transition-all duration-500 ease-in-out ${
                isSearchActive ? "w-96 opacity-100 bg-white shadow-md" : "w-0 opacity-0"
              } focus:outline-none`}
            />
          </div>

          {/* BOTÓN CERRAR */}
          <button className="text-red-600 transition-transform duration-300 transform hover:rotate-90 hover:scale-110" onClick={onClose}>
            <XMarkIcon className="h-6 w-6 text-[#990000]" />
          </button>
        </div>

        {/* LISTADO DE CURSOS */}
        <div className="flex-1 overflow-y-auto mt-2 space-y-2">
          {cursosFiltrados.length > 0 ? (
            cursosFiltrados.map((curso) => (
              <div key={curso.id} className="border-b py-2">
                <div className="grid grid-cols-3 items-center">
                  <span className="text-left">{curso.NombreCurso}</span>
                  <span className="text-center">{curso.Inicio || "dd/mm/aaaa"}</span>

                  {/* BOTÓN VER MÁS */}
                  <button onClick={() => handleVerMas(curso.id)} className="ml-4 bg-[#990000] text-white px-4 py-1 rounded transition-all duration-300 ease-in-out transform hover:scale-110 active:scale-95">
                    {expandedCursoId === curso.id ? "Ver menos" : "Ver más"}
                  </button>

                  {/* BOTÓN EDITAR */}
                  <button onClick={() => handleEditar(curso)} className="ml-4 bg-blue-600 text-white px-4 py-1 rounded transition-all duration-300 ease-in-out transform hover:scale-110 active:scale-95">
                    <PencilSquareIcon className="h-5 w-5" />
                  </button>
                </div>

                {/* DETALLES DEL CURSO */}
                {expandedCursoId === curso.id && (
                  <div className="p-4 border bg-gray-50 rounded-lg shadow-md mt-2">
                    <p><strong>Descripción:</strong> {curso.Descripcion}</p>
                    {/* Agrega más detalles según sea necesario */}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-center py-4">No hay cursos disponibles.</p>
          )}
        </div>
      </div>
    </div>
  );
}
  