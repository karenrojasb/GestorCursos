"use client";

import { useEffect, useState } from "react";
import { CheckCircleIcon, XCircleIcon, XMarkIcon, MagnifyingGlassIcon, UserIcon } from "@heroicons/react/24/solid";


interface Curso {
  id: number;
  NombreCurso: string;
  Valor: number;
  Publico: number;
  Periodo: string;
  Inicio: string;
  Fin: string;
  Horas: number;
  LunesIni: string;
  LunesFin: string;
  MartesIni: string;
  MartesFin: string;
  MiercolesIni: string;
  MiercolesFin: string;
  JuevesIni: string;
  JuevesFin: string;
  ViernesIni: string;
  ViernesFin: string;
  SabadoIni: string;
  SabadoFin: string;
  DomingoIni: string;
  DomingoFin: string;
  CupoMax: number;
  Linea: number;
  Lugar: string;
  Modalidad: number;
  Unidad: number;
  Profesor: number;
  SegundoPro: number;
  Proexterno: string;
  Descripcion: string;
  IdTipoCurso: number;
  NombreProfesor?: string;
}

interface Inscripcion {
  id: number;
  idCur: number;
  docInscr: number;
  est: boolean;
  fecreg: string;
}



export default function CatalogoModal({ onClose }: { onClose: () => void }) {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [cursosFiltrados, setCursosFiltrados] = useState<Curso[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [inscribiendo, setInscribiendo] = useState(false);
  const [idEmp, setIdEmp] = useState<number | null>(null);
  const [inscripciones, setInscripciones] = useState<Inscripcion[]>([]);
  const [mostrarAnimacion, setMostrarAnimacion] = useState(false);
  const [mensajeAnimacion, setMensajeAnimacion] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  
  
  
  const [esInscripcion, setEsInscripcion] = useState(true);

  useEffect(() => {
    const storedIdEmp = localStorage.getItem("id_emp");
    if (storedIdEmp) {
      setIdEmp(Number(storedIdEmp));
      fetchCursos(Number(storedIdEmp)); 
    }
  }, []);

  const fetchCursos = async (idEmp: number) => {
    try {
      const response = await fetch(`http://localhost:8090/api/cursos/usuario/${idEmp}`);
      if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
      
      const data = await response.json();
      
      
      const cursosActivos = Array.isArray(data) ? data : data.cursos || [];
  
      // FILTRAR CURSOS ACTIVOS
      const hoy = new Date();
      const cursosFiltrados = cursosActivos.filter(
        (curso: Curso) => !curso.Fin || new Date(curso.Fin) >= hoy
      );
  
      setCursos(cursosFiltrados);
      setCursosFiltrados(cursosFiltrados);
      setIsLoading(false);
    } catch (error) {
      console.error("Error al obtener los cursos:", error);
      setIsLoading(false);
    }
  };

  const formatearHorario = (curso: Curso) => {
    const dias = [
      { dia: "Lunes", ini: curso.LunesIni, fin: curso.LunesFin },
      { dia: "Martes", ini: curso.MartesIni, fin: curso.MartesFin },
      { dia: "Miércoles", ini: curso.MiercolesIni, fin: curso.MiercolesFin },
      { dia: "Jueves", ini: curso.JuevesIni, fin: curso.JuevesFin },
      { dia: "Viernes", ini: curso.ViernesIni, fin: curso.ViernesFin },
      { dia: "Sábado", ini: curso.SabadoIni, fin: curso.SabadoFin },
      { dia: "Domingo", ini: curso.DomingoIni, fin: curso.DomingoFin },
    ];
  
    return dias
      .filter(d => d.ini && d.fin)
     ; 
  };

  useEffect(() => {
    if (!idEmp) return;
    const fetchInscripciones = async () => {
      try {
        const response = await fetch(`http://localhost:8090/api/inscripciones?docInscr=${idEmp}`);
        if (!response.ok) throw new Error("Error al obtener inscripciones");
        const data = await response.json();
        setInscripciones(data.filter((ins: Inscripcion) => ins.est === true));
      } catch (error) {
        console.error("Error al obtener inscripciones:", error);
      }
    };
    fetchInscripciones();
  }, [idEmp]);


  const handleBuscar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const texto = e.target.value.toLowerCase();
    setBusqueda(texto);
    setCursosFiltrados(cursos.filter((curso) => curso.NombreCurso.toLowerCase().includes(texto)));
  };



  const handleInscripcion = async (idCur: number, estaInscrito: boolean, inscripcionId?: number) => {
    setInscribiendo(true);
    if (!idEmp) return;

    try {
      if (estaInscrito && inscripcionId) {
        await fetch(`http://localhost:8090/api/inscripciones/${inscripcionId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ est: false }),
        });
        setEsInscripcion(false);
        setMensajeAnimacion("Se ha desinscrito satisfactoriamente");
      } else {
        await fetch("http://localhost:8090/api/inscripciones", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idCur, docInscr: idEmp, est: true, fecreg: new Date().toISOString().split("T")[0] }),
        });
        setEsInscripcion(true);
        setMensajeAnimacion("Se ha inscrito satisfactoriamente");
      }

      const updatedResponse = await fetch(`http://localhost:8090/api/inscripciones?docInscr=${idEmp}`);
      const updatedData = await updatedResponse.json();
      setInscripciones(updatedData.filter((ins: Inscripcion) => ins.est === true));

      // MOSTRAR ANIMACIÓN
      setMostrarAnimacion(true);
      setTimeout(() => setMostrarAnimacion(false), 2500); 

    } catch (error) {
      console.error("No se pudo completar la acción.");
    }

    setInscribiendo(false);
  };

  const handleMouseEnter = () => {
    setIsSearchActive(true);
  };

  const handleMouseLeave = () => {
    if (busqueda === "") {
      setIsSearchActive(true);
    }
  };



  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative bg-white p-6   rounded-lg shadow-lg w-full  h-[700px] max-w-3xl flex flex-col">

       
      <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-[#990000] transition-transform duration-300 transform hover:rotate-90 hover:scale-110"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>

        {/* ANIMACIÓN DE CHECK O X */}
        {mostrarAnimacion && (
          <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="animate-check-spin scale-125">
              {esInscripcion ? (
                <CheckCircleIcon className="h-32 w-32 text-green-500" />
              ) : (
                <CheckCircleIcon className="h-32 w-32 text-green-500" />
              )}
            </div>
            <p className="text-white text-2xl font-bold mt-2 animate-fade-in">{mensajeAnimacion}</p>
          </div>
        )}

         {/* BARRA DE BÚSQUEDA Y BOTÓN DE CIERRE */}
     
          <div className="relative flex items-center"
           onMouseEnter={handleMouseEnter}
           onMouseLeave={handleMouseLeave}>
            <button onClick={() => setIsSearchActive(!isSearchActive)} className="p-2 rounded-full bg-gray-200">
              <MagnifyingGlassIcon className="h-6 w-6 text-[#990000]" />
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

        {/* TABLA DE CURSOS */}
        <div className="flex-1 overflow-y-auto mt-2">
          {isLoading ? (
            <div className="flex justify-center py-4">
              <div className="w-8 h-8 border-4 border-gray-300 border-t-[#990000] rounded-full animate-spin"></div>
            </div>
          ) : cursosFiltrados.length > 0 ? (
            <table className="w-full border-collapse border border-gray-500 ">
              <thead className="bg-[#990000] text-white">
                <tr >
                  <th className="border p-2">Nombre</th>
                  <th className="border p-2">Profesor</th>
                  <th className="border p-2">Horario</th>
                  <th className="border p-2">Lugar</th>
                  <th className="border p-2">Inicio Curso</th>
                  <th className="border p-2">Fin Curso</th>             
                  <th className="border p-2">Inscribir</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {cursosFiltrados.map((curso, index) => {
                  const inscripcion = inscripciones.find(ins => ins.idCur === curso.id && ins.est);
                  return (
                    <tr key={curso.id} className={`${index % 2 === 0 ? "bg-white" : "bg-gray-100"} text-center transition`}>

                      <td className="border p-2 font-semibold text-left">{curso.NombreCurso}</td>
                 
<td className="border px-2 py-1 text-left text-xs space-y-3">
  {[curso.NombreProfesor, curso.SegundoPro, curso.Proexterno]
    .filter((prof) => prof !== null && prof !== undefined && String(prof).trim() !== "")
    .map((profesor, index) => (
      <div key={index} className="flex items-center gap-1">
        <UserIcon className="h-4 w-4 text-[#990000] flex-shrink-0" />
        <span>{profesor}</span>
      </div>
    ))}

  {[curso.NombreProfesor, curso.SegundoPro, curso.Proexterno]
    .every((prof) => !prof || String(prof).trim() === "") && (
      <span className="text-gray-400 italic">Sin profesor asignado</span>
  )}
</td>

                      <td className="border px-5 py-2">{formatearHorario(curso).map((h, index) => (
                        <div key={index}>
                           <strong>{h.dia}</strong> {h.ini} - {h.fin}
                               </div>
                                 ))}</td>
                      <td className="border p-2">{curso.Lugar}</td>
                      <td className="border p-2">{curso.Inicio || "N/A"}</td>
                      <td className="border p-2">{curso.Fin || "N/A"}</td>
                  

                     
                      
                      <td className="border p-2 text-center">
                        <button
                          onClick={() => handleInscripcion(curso.id, !!inscripcion, inscripcion?.id)}
                          className={`${
                            inscripcion
                            ?  "bg-[#990000] hover:bg-red-700 text-white text-lg"
                            : "bg-green-600 hover:bg-green-700 text-white text-lg"
                          } px-3 py-2 rounded transition-colors duration-300  hover:scale-110 active:scale-95`}
                        >
                          {inscripcion ? "Cancelar" : "Inscribirse"}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <p className="text-center py-4">No hay cursos disponibles.</p>
                 
          
          )}
        </div>
      </div>
      </div>
  );
}
