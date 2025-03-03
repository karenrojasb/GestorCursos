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

  // FUNCIÓN PARA OBTENER CURSOS DEL BACKEND
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

  // CARGAR CURSOS AL MONTAR COMPONENTE
  useEffect(() => {
    fetchCursos();
  }, []);

  // BUSCAR CURSOS POR NOMBRE
  const handleBuscar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const texto = e.target.value.toLowerCase();
    setBusqueda(texto);
    setCursosFiltrados(cursos.filter(curso => curso.NombreCurso.toLowerCase().includes(texto)));
  };

  // EXPANDIR DETALLES DEL CURSO
  const handleVerMas = (id: number) => {
    setExpandedCursoId(expandedCursoId === id ? null : id);
  };

  // INICIAR EDICIÓN DEL CURSO
  const handleEditar = (curso: Curso) => {
    setEditandoCurso({ ...curso });
  };

  const handleChange = ( e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!editandoCurso) return;
    const { name, value} = e.target;
    setEditandoCurso({...editandoCurso, [name]: value});
  };

  // GUARDAR CAMBIOS AL EDITAR
  const handleGuardarEdicion = async () => {
    if (!editandoCurso) return;

    try {
      const response = await fetch(`http://localhost:8090/api/cursos/${editandoCurso.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editandoCurso),
      });

      if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

      // RESPUESTA DEL BACKEND
      const updatedCourse = cursos.map(c => (c.id === editandoCurso.id ? editandoCurso : c));
      setCursos(updatedCourse);
      setCursosFiltrados(updatedCourse);
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

        {/* BARRA BUSQUEDA */}
        <div className="flex items-center space-x-2 mb-4">
          <button onClick={() => setIsSearchActive(!isSearchActive)} className="p-2 rounded-full bg-gray-200 transition-transform duration-500 ease-in-out">
            {isSearchActive ? <XMarkIcon className="h-6 w-6 text-[#990000] transition-transform rotate-180" /> : <MagnifyingGlassIcon className="h-6 w-6 text-[#990000] transition-transform" />}
          </button>
          <input
            type="text"
            placeholder="Busque el nombre del curso"
            value={busqueda}
            onChange={handleBuscar}
            className={`px-4 py-2 border rounded-full transition-all duration-500 ease-in-out ${isSearchActive ? "w-96 opacity-100 bg-white shadow-md" : "w-0 opacity-0"} focus:outline-none`}
          />
        </div>

        {/* LISTA DE CURSOS */}
        <div className="flex-1 overflow-y-auto max-h-[60vh] space-y-2">
          {cursosFiltrados.length > 0 ? (
            cursosFiltrados.map((curso) => (
              <div key={curso.id} className="border-b py-2">
                <div className="grid grid-cols-3 items-center">
                  <span className="text-left">{curso.NombreCurso}</span>
                  <span className="text-center">{curso.Inicio || "dd/mm/aaaa"}</span>

                  {/* BOTONES */}

                  {/* BOTÓN VER MÁS */}
                  <div className="flex space-x-2">
                    <button onClick={() => handleVerMas(curso.id)} className="bg-[#990000] text-white px-4 py-1 rounded transition-transform hover:scale-110 active:scale-95">
                      {expandedCursoId === curso.id ? "Ver menos" : "Ver más"}
                    </button>

                    {/* BOTÓN PARA EDITAR CURSO */}
                    <button onClick={() => handleEditar(curso)} className="bg-[#990000] text-white px-4 py-1 rounded transition-transform hover:scale-110 active:scale-95">
                      <PencilSquareIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* DETALLE DE CURSOS */}
                {expandedCursoId === curso.id && (
                  <div className="p-4 border border-gray-300 bg-gray-50 rounded-lg shadow-md mt-2">
                    <h3 className="text-lg font-bold text-[#990000] mb-2">{curso.NombreCurso}</h3>
                    <p><strong>Id:</strong> {curso.id}</p>
                    <p><strong>Valor:</strong> {curso.Valor}</p>
                    <p><strong>Publico:</strong> {curso.Publico}</p>
                    <p><strong>Periodo:</strong> {curso.Periodo}</p>
                    <p><strong>Inicio:</strong> {curso.Inicio}</p>
                    <p><strong>Fin:</strong> {curso.Fin}</p>
                    <p><strong>Horas:</strong> {curso.Horas}</p>
                    <p><strong>CupoMax:</strong> {curso.CupoMax}</p>
                    <p><strong>Lugar:</strong> {curso.Lugar}</p>
                    <p><strong>Linea:</strong> {curso.Linea}</p>
                    <p><strong>Estado:</strong> {curso.Estado}</p>
                    <p><strong>Modalidad:</strong> {curso.Modalidad}</p>
                    <p><strong>Unidad:</strong> {curso.Unidad}</p>
                    <p><strong>Profesor:</strong> {curso.Profesor}</p>
                    <p><strong>SegundoPro:</strong> {curso.SegundoPro}</p>
                    <p><strong>Descripción:</strong> {curso.Descripcion}</p>
                    <p><strong>IdTipoCurso:</strong> {curso.IdTipoCurso}</p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-center py-4">No hay cursos disponibles.</p>
          )}
        </div>
      </div>

      {/* EDICIÓN DE CURSO */}
      {editandoCurso && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-h-[80vh] overflow-y-auto w-full max-w-md">
            <h2 className="text-lg font-bold">Editar Curso</h2>
            
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
