"use client";



import { XMarkIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
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
  LunesIni?: string;                          
  LunesFin? : string;                         
  MartesIni?  : string;                       
  MartesFin? : string;                        
  MiercolesIni?: string;                      
  MiercolesFin? : string;                     
  JuevesIni?: string;                         
  JuevesFin?: string;                        
  ViernesIni?: string;                       
  ViernesFin?: string;                      
  SabadoIni?: string;                       
  SabadoFin?: string;                        
  DomingoIni?: string;                        
  DomingoFin? : string;                      
  Linea: number;                             
  Estado: number;                             
  Modalidad: number;                          
  Unidad: number;                             
  Profesor: number;                           
  SegundoPro : string;                       
  Proexterno : string;                     
  Descripcion: string; 
  IdTipoCurso: number;


}

export default function CatalogoModal({ onClose }: { onClose: () => void }) {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [cursosFiltrados, setCursosFiltrados] = useState<Curso[]>([]);
  const [expandedCursoId, setExpandedCursoId] = useState<number | null>(null);
  const [busqueda, setBusqueda] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const response = await fetch("http://localhost:8090/api/cursos");
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }
        {/* */}
        const data = await response.json();
        setCursos(data);
        setCursosFiltrados(data);

        const hoy = new Date();

        const cursosActivos = data.filter((curso: Curso) => {
          if (!curso.Fin) return true;
          
          const fechaFin = new Date(curso.Fin);
          return fechaFin >= hoy;
        });

        setCursos(cursosActivos);
        setCursosFiltrados(cursosActivos);

      } catch (error) {
        console.error("Error al obtener los cursos:", error);
      }
    };

    fetchCursos();
  }, []);

  const handleBuscar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const texto = e.target.value.toLowerCase();
    setBusqueda(texto);

   const filtrados = cursos.filter((curso) =>
      curso.NombreCurso.toLowerCase().includes(texto)
    );
    setCursosFiltrados(filtrados);
  };


  const handleVerMas = (id: number) => {
    setExpandedCursoId(expandedCursoId === id ? null : id);
  };



  const handleMouseEnter = () => {
    setIsSearchActive(true);
  };

  const handleMouseLeave = () => {
    if (busqueda === "") {
      setIsSearchActive(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-full h-[700px] max-w-3xl flex flex-col">
        {/* BARRA DE BUSQUEDA */}
        <div className="flex justify-between items-center mb-4">
          <div className="relative flex items-center"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}>
            <button
              onClick={() => setIsSearchActive(!isSearchActive)}
              className="p-2 rounded-full bg-gray-200 transition-transform duration-500 ease-in-out"
              
              >
              {isSearchActive ? (
                <XMarkIcon className="h-6 w-6 text-[#990000] transition-transform rotate-180" />
              ) : (
                <MagnifyingGlassIcon className="h-6 w-6 text-[#990000] transition-transform" />
              )}
            </button>

            <input
              type="text"
              placeholder="Busque el nombre del curso"
              value={busqueda}
              onChange={handleBuscar}
              className={` px-4 py-2 border rounded-full transition-all duration-500 ease-in-out 
                ${isSearchActive ? "w-96 opacity-100 bg-white shadow-md" : "w-0 opacity-0"} focus:outline-none`}
            />
          </div>

          {/* BOTÓN CERRAR */}
          <button className="absolute top-4 right-4 text-gray-500 hover:text-[#990000] transition-transform duration-300 hover:rotate-90" onClick={onClose}>
                    <XMarkIcon className="w-6 h-6" />
                  </button>
        </div>

        {/* ENCABEZADOS */}
        <div className="grid grid-cols-3 font-semibold border-b pb-2">
          <span className="">Nombre del curso</span>
          <span className="text-center">Fecha</span>
          <span className="text-right w-16"></span>
        </div>

        {/* CONTENIDO DE LOS CURSOS*/}
        <div className="flex-1 overflow-y-auto mt-2 space-y-2">
          {cursosFiltrados.length > 0 ? (
            cursosFiltrados.map((curso) => (
              <div key={curso.id} className="border-b py-2">
                <div className="grid grid-cols-3 items-center">
                  <span className="text-left">{curso.NombreCurso}</span>
                  <span className="text-center">{curso.Inicio || "dd/mm/aaaa"}</span>

                 {/* Botón "Ver más" con animación */}
                  <button
                    onClick={() => handleVerMas(curso.id)}
                    className="ml-4 bg-[#990000] text-white px-4 py-1 rounded w-24 h-11 flex justify-center items-center transition-all 
                    duration-300 ease-in-out transform hover:scale-110 active:scale-95"
                  >
                    {expandedCursoId === curso.id ? "Ver menos" : "Ver más"}
                  </button>
                </div>

               {/* Contenido expandido del curso */}
                {expandedCursoId === curso.id && (
                  


                  <div className="p-4 border border-gray-300 bg-gray-50 rounded-lg shadow-md mt-2">
                     <h3 className="text-ig font-bold text-[#990000] mb-2">{curso.NombreCurso}</h3>
                    
                    
                    <p><strong>Id:</strong> {curso.id}</p>
                    <p><strong>Valor:</strong> {curso.Valor}</p>
                    <p><strong>Fin:</strong> {curso.Fin}</p>
                    <p><strong>Publico:</strong> {curso.Publico}</p>
                    <p><strong>Periodo:</strong> {curso.Periodo}</p>
                    <p><strong>Horas:</strong> {curso.Horas}</p>
                    <p><strong>Lugar:</strong> {curso.Lugar}</p>
                    <p><strong>Profesor:</strong> {curso.Profesor}</p>
                    <p><strong>Descripción:</strong> {curso.Descripcion}</p>

                     <button className="ml-72 bg-[#990000] text-white px-4 py-1 rounded w-24 h-11 flex justify-center items-center transition-all 
                    duration-300 ease-in-out transform hover:scale-110 active:scale-95">
                      Inscribir
                      </button>
             
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

