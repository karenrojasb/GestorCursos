"use client";
import { TrashIcon, XMarkIcon, MagnifyingGlassIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
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
  Linea: number;
  Estado: number;
  Modalidad: number;
  Unidad: number;
  Profesor: number;
  SegundoPro: string;
  Proexterno: string;
  Descripcion: string;
  IdTipoCurso: number;
  NombreProfesor?: string;
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
}
interface Opcion {
  id: number;
  Especificacion: string;
  Tipo: number;
}

export default function CatalogoModal({ onClose }: { onClose: () => void }) {
  
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [cursosFiltrados, setCursosFiltrados] = useState<Curso[]>([]);
  const [expandedCursoId, setExpandedCursoId] = useState<number | null>(null);
  const [busqueda, setBusqueda] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [editandoCurso, setEditandoCurso] = useState<Curso | null>(null);
  const [mensajeExito, setMensajeExito] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [opcionesPublico, setOpcionesPublico] = useState<Opcion[]>([]);
  const [opcionesLinea, setOpcionesLinea] = useState<Opcion[]>([]);
  const [opcionesModalidad, setOpcionesModalidad] = useState<Opcion[]>([]);
  const [opcionesEstado, setOpcionesEstado] = useState<Opcion[]>([]);
  const [opcionesTipoCurso, setOpcionesTipoCurso] = useState<Opcion[]>([]);
  const [profesores, setProfesores] = useState<{ id_emp: number; nombre: string}[]>([]);
  const [unidad, setUnidad] = useState<{ codigo: number; nombre: string}[]>([])
  const [opcionesPeriodos, setOpcionesPeriodos] = useState<{ periodo: string}[]>([]);

 

  // OBTENER CURSO DE BACKEND
  const fetchCursos = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:8090/api/cursos");
      if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
      const data = await response.json();
      setCursos(data);
      setCursosFiltrados(data);
    } catch (error) {
      console.error("Error al obtener los cursos:", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCursos();
  }, []);

   useEffect(() => {
      async function fetchOpciones() {
        try {
          const response = await fetch("http://localhost:8090/api/cursos/especificaciones");
          if (!response.ok) throw new Error("Error al obtener las opciones");
  
          const data: Opcion[] = await response.json();
  
          setOpcionesPublico(data.filter((item) => item.Tipo === 1));
          setOpcionesLinea(data.filter((item) => item.Tipo === 2));
          setOpcionesModalidad(data.filter((item) => item.Tipo === 3));
          setOpcionesEstado(data.filter((item) => item.Tipo === 4));
          setOpcionesTipoCurso(data.filter((item) => item.Tipo === 8));
        } catch (error) {
          console.error("Error cargando las opciones:", error);
        }
      }
  
      fetchOpciones();
    }, []);

    useEffect(()  => {
      async function fetcProfesores() {
        try {
          const response = await fetch("http://localhost:8090/api/cursos/profesores")
          if (!response.ok) throw new Error("Error al obtener los profesores");
  
          const data = await response.json();
          setProfesores(data);
          } catch(error){
            console.error("Error cargando los profesores:", error);
          }
        }
        fetcProfesores(); 
    }, []);

    useEffect(()  => {
      async function fetcPeriodos() {
        try {
          const response = await fetch("http://localhost:8090/api/cursos/periodos")
          if (!response.ok) throw new Error("Error al obtener los periodos");
  
          const data = await response.json();
          setOpcionesPeriodos(data);
          } catch(error){
            console.error("Error cargando lista de periodos:", error);
          }
        }
        fetcPeriodos(); 
    }, []);
  
  
    useEffect(()  => {
      async function fetcUnidades() {
        try {
          const response = await fetch("http://localhost:8090/api/cursos/unidad")
          if (!response.ok) throw new Error("Error al obtener las unidades");
  
          const data = await response.json();
          setUnidad(data);
          } catch(error){
            console.error("Error cargando lista de unidades:", error);
          }
        }
        fetcUnidades(); 
    }, []);




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

  // BUSCAR CURSOS
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
      setIsSearchActive(true);
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

    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:8090/api/cursos/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

      setMensajeExito("Curso eliminado correctamente");
      setTimeout(() => setMensajeExito(""), 3000);
      setCursos(prev => prev.filter(curso => curso.id !== id));
      setCursosFiltrados(prev => prev.filter(curso => curso.id !== id));
    } catch (error) {
      console.error("Error al eliminar el curso:", error);
      alert("No se pudo eliminar el curso");
    }
    setIsLoading(false);
  };

  // INICIAR EDICIÓN
  const handleEditar = (curso: Curso) => {
    setEditandoCurso({ ...curso });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (!editandoCurso) return;
    const { name, value } = e.target;
  
    setEditandoCurso((prev) => {
      if (!prev) return null;
  
      const camposNumericos = ["Valor", "Publico", "Horas", "Linea", "Estado", "Modalidad", "Unidad", "Profesor", "IdTipoCurso"];
  
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


    setIsLoading(true);
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

      // CERRAR MODA DE EDICIÓN
      setTimeout(()=> {
        setMensajeExito("");
        setEditandoCurso(null);
      }, 3000);
      
    } catch (error) {
      console.error("Error al guardar la edición:", error);
    }
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl h-[90vh] overflow-y-auto">
        
       {/* BOTÓN CERRAR */}
              <button
                onClick={onClose}
                className="absolute top-2 right-2 text-gray-500 hover:text-[#990000] transition-transform duration-300 transform hover:rotate-90 hover:scale-110"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>

        {/* BARRA DE BUSQUEDA */}
        <div className="relative flex items-center"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}>
            <button 
            
            onClick={() => setIsSearchActive(!isSearchActive)} className="p-2 rounded-full bg-gray-200">
              {isSearchActive ? <MagnifyingGlassIcon className="h-6 w-6 text-[#990000]" /> : <MagnifyingGlassIcon className="h-6 w-6 text-[#990000]" />}
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


         <div className="w-full flex justify-between text-[#990000] font-semibold px-4 py-2 rounded-t-lg">
           <span className="w-1/3 text-left">Nombre del curso</span>
           <span className="w-1/3 text-center">Inicio Curso</span>
           <span className="w-1/3"></span>
         </div>

        {/* SPINNER DE CARGA */}
        {isLoading && (
          <div className="flex justify-center my-4">
            <div className="w-10 h-10 border-4 border-[#990000] border-solid border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

         {/* LISTA DE CURSOS */}
        
         <div className="flex-1 overflow-y-auto max-h-[75vh] space-y-2">
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
                    className="bg-[#990000] hover:bg-red-700 text-white px-4 py-2 rounded transition-transform hover:scale-110 active:scale-95">
                      {expandedCursoId === curso.id ? "Ver menos" : "Ver más"}
                    </button>
                   
                    {/* BOTÓN PARA EDITAR */}
                    <button 
                    onClick={() => handleEditar(curso)} 
                    className="bg-[#990000] hover:bg-red-700 text-white p-2 rounded transition-transform hover:scale-110 active:scale-95"
                    title="Editar">
                      <PencilSquareIcon className="h-5 w-5" />
                    </button>
                    
                    {/* BOTÓN PARA ELIMINAR */}
                     <button 
                     onClick={() => handleDeleteCourse(curso.id)} 
                     className="bg-[#990000] hover:bg-red-700 text-white p-2 rounded transition-transform hover:scale-110 active:scale-95"
                     title="Eliminar">                    
                       <TrashIcon className="h-5 w-5"/>
                     </button>
                   </div>


                   {/* CONTENIDO DE CURSO */}
                   {expandedCursoId === curso.id && (
                  
                  
                  <div className="relative bg-gray-100 p-6  flex mt-5 justify-center overflow-x-auto min-w-[680px]">
  <table className="border-collapse w-auto text-sm shadow-lg rounded-lg overflow-hidden ">
    <thead className="bg-[#990000] text-white font-semibold">
      <tr>
        <th className="border px-4 py-2">Nombre del curso</th>
        <th className="border px-4 py-2">ID</th>
        <th className="border px-4 py-2">Valor</th>
        <th className="border px-4 py-2">Público</th>
        <th className="border px-4 py-2">Periodo</th>
      </tr>
    </thead>
    <tbody>
      <tr className="bg-gray-50 ">
        <td className="border px-4 py-2">{curso.NombreCurso}</td>
        <td className="border px-4 py-2">{curso.id}</td>
        <td className="border px-4 py-2">{curso.Valor}</td>
        <td className="border px-4 py-2">{curso.Publico}</td>
        <td className="border px-4 py-2">{curso.Periodo}</td>
      </tr>

      <tr >
        <th className="border px-4 py-2 bg-[#990000] text-white">Fecha de Inicio</th>
        <th className="border px-4 py-2 bg-[#990000] text-white">Fecha de Fin</th>
        <th className="border px-4 py-2 bg-[#990000] text-white">Horas</th>
        <th className="border px-4 py-2 bg-[#990000] text-white">Horario</th> 
        <th className="border px-4 py-2 bg-[#990000] text-white">Cupo Máximo</th>

      </tr>
      <tr className="bg-gray-50  ">
        <td className="border px-4 py-2 ">{curso.Inicio}</td>
        <td className="border px-4 py-2">{curso.Fin}</td>
        <td className="border px-4 py-2">{curso.Horas}</td>
        <td className="border px-4 py-2">{formatearHorario(curso).map((h, index) => (
          <div key={index}>
            <strong>{h.dia}</strong> {h.ini} - {h.fin}
          </div>
        ))}</td>
        <td className="border px-4 py-2">{curso.CupoMax}</td>
        
      </tr>

      <tr>
        <th className="border px-4 py-2 bg-[#990000] text-white">Lugar</th>
        <th className="border px-4 py-2 bg-[#990000] text-white">Línea</th>
        <th className="border px-4 py-2 bg-[#990000] text-white">Estado</th>
        <th className="border px-4 py-2 bg-[#990000] text-white">Modalidad</th>
      
        <th className="border px-4 py-2 bg-[#990000] text-white">Profesor</th>
      </tr>
      <tr className="bg-gray-50 ">
        <td className="border px-4 py-2">{curso.Lugar}</td>
        <td className="border px-4 py-2">{curso.Linea}</td>
        <td className="border px-4 py-2">{curso.Estado}</td>
        <td className="border px-4 py-2">{curso.Modalidad}</td>
        <td className="border px-4 py-2">{curso.NombreProfesor}</td>
      </tr>

      <tr>
         
        <th className="border px-4 py-2 bg-[#990000] text-white">Segundo Profesor</th>
        <th className="border px-4 py-2 bg-[#990000] text-white">Profesor Externo</th>
        <th className="border px-4 py-2 bg-[#990000] text-white">Unidad</th>
        <th className="border px-4 py-2 bg-[#990000] text-white">Tipo de Curso</th>
        <th className="border px-4 py-2 bg-[#990000] text-white" >Descripción</th>
      </tr>
      <tr className="bg-gray-50 ">
      
       <td className="border px-4 py-2">{curso.SegundoPro}</td>
       <td className="border px-4 py-2">{curso.Proexterno}</td>
       <td className="border px-4 py-2">{curso.Unidad}</td>
        <td className="border px-4 py-2">{curso.IdTipoCurso}</td>
        <td className="border px-4 py-2"   >{curso.Descripcion}</td>
        
      </tr>
      
    </tbody>
  </table>
</div>            
                     
              
                 )}
               </div>
              </div>
              ))
           ) : !isLoading && (
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

      {key === "Publico" ? (
        // Si el campo es "Publico", usa un <select> en lugar de un <input>
        <select
          name="Publico"
          value={editandoCurso.Publico}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        >
          {opcionesPublico.map((opcion) => (
            <option key={opcion.id} value={opcion.id}>
              {opcion.Especificacion}
            </option>
          ))}
        </select>

        
      ) : key === "Linea" ? (
        <select
        name={key}
        value={editandoCurso.Linea}
        onChange={handleChange}
        className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-[#990000]">
        
          {opcionesLinea.map((opcion) => (
            <option key={opcion.id} value={opcion.id}>
              {opcion.Especificacion}
            </option>
          ))}
        </select>

         ) : key === "Modalidad" ? (
        <select
        name={key}
        value={editandoCurso.Modalidad}
        onChange={handleChange}
        className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-[#990000]">
        
          {opcionesModalidad.map((opcion) => (
            <option key={opcion.id} value={opcion.id}>
              {opcion.Especificacion}
            </option>
          ))}
        </select>

         ) : key === "Estado" ? (
        <select
        name={key}
        value={editandoCurso.Estado}
        onChange={handleChange}
        className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-[#990000]">
        
          {opcionesEstado.map((opcion) => (
            <option key={opcion.id} value={opcion.id}>
              {opcion.Especificacion}
            </option>
          ))}
        </select>

         ) : key === "IdTipoCurso" ? (
        <select
        name={key}
        value={editandoCurso.IdTipoCurso}
        onChange={handleChange}
        className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-[#990000]">
        
          {opcionesTipoCurso.map((opcion) => (
            <option key={opcion.id} value={opcion.id}>
              {opcion.Especificacion}
            </option>
          ))}
        </select>

        ) : key === "Profesor" || key === "SegundoPro" ? (
       <select
       name={key}
       value={editandoCurso.Profesor}
       onChange={handleChange}
       className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-[#990000]">
   
          {profesores.map((profesor) => (
            <option key={profesor.id_emp} value={profesor.id_emp}>
             {profesor.nombre}
             </option>
          ))}
        </select>

         ) : key === "Unidad" ? (
                <select
                name={key}
                value={editandoCurso.Unidad}
                onChange={handleChange}
                className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-[#990000]">
                  
                  {unidad.map((unidad) => (
                    <option key={unidad.codigo} value={unidad.codigo}>
                      {unidad.nombre}
                    </option>
                  ))}
                </select>

         ) : key === "Periodo" ? (
          <select
          name={key}
          value={editandoCurso.Periodo}
          onChange={handleChange}
          className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-[#990000]">
            
            {opcionesPeriodos.map((opcion, index) => (
              <option key={index} value={opcion.periodo}>
                {opcion.periodo}
              </option>
            ))}
          </select>
  ) : (
        
        <input
          type="text"
          name={key}
          value={editandoCurso ? (editandoCurso as any)[key] ?? "" : ""}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
      )}
    </div>
  )
))}
    

       {/* BOTONES GUARDAR Y CANCELAR */}
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
