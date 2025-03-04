"use client";
import { TrashIcon } from "@heroicons/react/16/solid";
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
  Proexterno : number;                     
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
  const [mensajeExito, setMensajeExito] = useState("");

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

  // BUSCAR CURSOS POR NOMBRE
  const handleBuscar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const texto = e.target.value.toLowerCase();
    setBusqueda(texto);
    setCursosFiltrados(cursos.filter(curso => curso.NombreCurso.toLowerCase().includes(texto)));
  };
  const handleMouseEnter = () => {
    setIsSearchActive(true);
  };

  const handleMouseLeave = () => {
    if (busqueda === "") {
      setIsSearchActive(false);
    }
  };

  // EXPANDIR DETALLES DEL CURSO
  const handleVerMas = (id: number) => {
    setExpandedCursoId(expandedCursoId === id ? null : id);
  };

  // ELIMINAR CURSO
  const handleDeleteCourse =async (id: number) => {
    const confirmar = window.confirm("¿Estas seguro de que deseas eliminar este curso?");
    if (!confirmar) return;

    try {
      const response = await fetch(`http://localhost:8090/api/cursos/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        console.error("Error al eliminar el curso:", response.status);
        return 
      }
      setMensajeExito("Curso eliminado correctamente");
      setTimeout(() => setMensajeExito(""), 3000 );
      setCursos(prevCursos => prevCursos.filter(cursos => cursos.id !== id));
      setCursosFiltrados(prevCursos => prevCursos.filter(cursos => cursos.id !== id));
    } catch (error) {
      console.error("Error al guardar la edición", error);
      alert("No se pudo eliminar el curso");
    }
  }; 

  // INICIAR EDICIÓN DEL CURSO
  const handleEditar = (curso: Curso) => {
    setEditandoCurso({ ...curso });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!editandoCurso) return;
    const { name, value } = e.target;

    setEditandoCurso((prev) => {
      if (!prev) return null;
      
      const camposNumericos = ["Valor", "Publico", "Horas", "Linea", "Estado", "Modalidad", "Unidad", "Profesor", "SegundoPro", "IdTipoCurso"];

      return {
        ...prev,
        [name]: camposNumericos.includes(name) ? parseInt(value) || 0 : value,
      };
    
    });
  };
 
  // GUARDAR CAMBIOS AL EDITAR
  const handleGuardarEdicion = async () => {
    if (!editandoCurso) return;
    console.log("Intentando guardar cambios...");
    console.log("Datos enviados al backend:", JSON.stringify(editandoCurso, null, 2));

    try {
      const response = await fetch(`http://localhost:8090/api/cursos/${editandoCurso.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editandoCurso),
      });

      if (!response.ok) {
        console.error("Error HTTP al actualizar:", response.status);
        const errorText = await response.text();
        console.error("Respuesta del servidor:", errorText)
        return;
      }

      console.log("Curso actualizado con éxito");
      
      setMensajeExito("¡Curso actualizado con éxito!");

      // RECARGAR DESPUES DE LA ACTUALIZACIÓN DEL CURSO
      await fetchCursos();

      // CERRAR MODAÑ DE EDICIÓN
      setTimeout(()=> {
        setMensajeExito("");
        setEditandoCurso(null);
      }, 3000);
      
    } catch (error) {
      console.error("Error al guardar la edición:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl max-h-[80vh] overflow-y-auto">
        
        {/* BOTÓN CERRAR */}
        <button className="absolute top-4 right-4 text-gray-500 hover:text-[#990000] transition-transform duration-300 hover:rotate-90" onClick={onClose}>
          <XMarkIcon className="w-6 h-6" />
        </button>

        {/* BARRA BUSQUEDA */}
        <div className="flex items-center space-x-2 mb-4"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
          {/* BOTÓN PARA ACTIVAR BUSQUEDA */}
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
        <table className="w-full border-collapse border border-white ">
          <thead>
            <tr className="border-spa text-gray-700 ">
              <th className="py-2 px-4 border">Nombre del curso</th>
              <th className="py-2 px-4 border">Fecha</th>
              <th className="py-2 px-4 border">Acciones</th>
            </tr>
          </thead>
        </table>
        {/* LISTA DE CURSOS */}
        <div className="flex-1 overflow-y-auto max-h-[60vh] space-y-2">
          {cursosFiltrados.length > 0 ? (
            cursosFiltrados.map((curso) => (
              <div key={curso.id} className="border-b py-2">
                <div className="grid grid-cols-3 items-center">
                  <span className="text-left">{curso.NombreCurso}</span>
                  <span className="text-center">{curso.Inicio || "dd/mm/aaaa"}</span>

                  {/* BOTONES */}
                 
                  {/* BOTÓN PARA VER MÁS */}
                  <div className="flex space-x-2">
                    <button 
                    onClick={() => handleVerMas(curso.id)} 
                    className="bg-[#990000] text-white px-4 py-2 rounded transition-transform hover:scale-110 active:scale-95">
                      {expandedCursoId === curso.id ? "Ver menos" : "Ver más"}
                    </button>
                   
                    {/* BOTÓN PARA EDITAR */}
                    <button 
                    onClick={() => handleEditar(curso)} 
                    className="bg-[#990000] text-white p-2 rounded transition-transform hover:scale-110 active:scale-95"
                    title="Editar">
                      <PencilSquareIcon className="h-5 w-5" />
                    </button>
                    
                    {/* BOTÓN PARA ELIMINAR */}
                    <button 
                    onClick={() => handleDeleteCourse(curso.id)} 
                    className="bg-[#990000] text-white p-2 rounded transition-transform hover:scale-110 active:scale-95"
                    title="Eliminar">                    
                      <TrashIcon className="h-5 w-5"/>
                    </button>
                  </div>

                  {/* CONTENIDO DE CURSO */}
                  {expandedCursoId === curso.id && (
                  
                  <div className="p-8 px-4 py-2  space-x-2 border border-gray-300 bg-gray-50 rounded-lg  shadow-md mt-2">
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
                  </div>
                )}
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
    <div className="relative bg-white p-6 rounded-lg shadow-lg max-h-[80vh] overflow-y-auto w-full max-w-md">
      
      {/* BOTÓN PARA CERRAR */}
      <button className="absolute top-4 right-4 text-gray-500 hover:text-[#990000] transition-transform duration-300 hover:rotate-90" 
        onClick={() => setEditandoCurso(null)}>
        <XMarkIcon className="w-6 h-6" />
      </button>

      <h2 className="text-lg text-[#990000] font-bold mb-4">Editar Curso</h2>
      {/* MENSAJE DE ÉXITO AL ACTUALIZAR EL CURSO*/}
      {mensajeExito && (
        <div className="fixed top-10 left-1/2 transform -translate-x-1/2 bg-[#990000] text-white p-2 rounded text-center mb-4">
          {mensajeExito}
        </div>
      )}

      {/* FORMULARIO DE EDICIÓN */}
      {Object.keys(editandoCurso).map((key) => (
        key !== "id" && (
          <div key={key} className="mt-2">
            <label className="block text-sm font-bold">{key}</label>
            <input
              type="text"
              name={key}
              value={editandoCurso ? (editandoCurso as any)[key] ?? "" : ""}
              onChange={handleChange}
              className="border p-2 w-full rounded"
            />
          </div>
        )
      ))}

      {/* BOTONES */}
      <div className="mt-4 flex space-x-4 ">
        <button onClick={handleGuardarEdicion} className="bg-[#990000] text-white px-4 py-2 rounded">Guardar</button>
        <button onClick={() => setEditandoCurso(null)} className="bg-gray-700 text-white px-4 py-2 rounded">Cancelar</button>
      </div>
            
          </div>
        </div>
      )}
    </div>
  );
}
