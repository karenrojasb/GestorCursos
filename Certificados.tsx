"use client";
import { TrashIcon, XMarkIcon, MagnifyingGlassIcon, PencilSquareIcon, ArrowDownTrayIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import CursoEditarModal from "../components/CursoEditarModal"
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";


interface Nota {
  Nota: number;
  idRegistro: number;
  FechaRegistro: string;
  NotaEspecificacion: string;
  NombreInscrito: string;
  NombreRegistro: string; 
}

interface Inscrito {
  FechaRegistro: any;
  idRegistro: string;
  id: number;
  idCur: number;
  docInscr: number;
  est: boolean;
  fecreg: string;
  Notas?: Nota[];
}

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
  InicioInscr: string;
  FinInscr: string;

  Inscritos ?: string;

}



export default function CatalogoModal({ onClose }: { onClose: () => void }) {
  
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [cursosFiltrados, setCursosFiltrados] = useState<Curso[]>([]);
  const [expandedCursoId, setExpandedCursoId] = useState<number | null>(null);
  const [busqueda, setBusqueda] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [mensajeExito, setMensajeExito] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [cursoEditar, setCursoEditar ] = useState <Curso | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMensaje, setErrorMensaje] = useState(false);
  const [especificaciones, setEspecificaciones] = useState<{ id: number; Especificacion: string }[]>([]);

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

  const handleUpdate = () => {
    fetchCursos();
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


      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      
      
      setCursos(prev => prev.filter(curso => curso.id !== id));
      setCursosFiltrados(prev => prev.filter(curso => curso.id !== id));
    } catch (error) {
      console.error("Error al eliminar el curso:", error);
      alert("No se pudo eliminar el curso");
    }
    setIsLoading(false);
  };



  const handleEditarCurso = (curso: Curso) => {
    setCursoEditar({...curso});
  };

  const handleCerrarEditor = ()  => {
    setCursoEditar(null);
  };

  const handleGuardarEdicion = () => {
    if (cursoEditar) {
      setCursos((prevCursos) =>
        prevCursos.map((curso) => (curso.id === cursoEditar.id ? cursoEditar : curso))
      );
      setCursosFiltrados((prevCursos) =>
        prevCursos.map((curso) => (curso.id === cursoEditar.id ? cursoEditar : curso))
      );

      
      setCursoEditar(null);
      fetchCursos();
    }
  };


  useEffect(() => {
  const fetchEspecificaciones = async () => {
    try {
      const res = await fetch("http://localhost:8090/api/listas/Especificaciones");
      const data = await res.json();
      setEspecificaciones(data);
    } catch (error) {
      console.error("Error al obtener las especificaciones:", error);
    }
  };
  fetchEspecificaciones();
}, []);



  function exportarCursoAExcel(curso: Curso) {
  const inscritos: Inscrito[] = curso.Inscritos ? JSON.parse(curso.Inscritos) : [];

  // 🧾 Hoja 1: Datos del curso
  const datosCurso = [
    {
      ID: curso.id,
      Nombre: curso.NombreCurso,
      Valor: curso.Valor,
      Público: curso.Publico,
      Periodo: curso.Periodo,
      CupoMax: curso.CupoMax,
      Inicio: curso.Inicio,
      Fin: curso.Fin,
      Horas: curso.Horas,
      Lugar: curso.Lugar,
      Estado: curso.Estado,
      Modalidad: curso.Modalidad,
      Unidad: curso.Unidad,
      Profesor: curso.NombreProfesor,
      SegundoProfesor: curso.SegundoPro,
      ProfesorExterno: curso.Proexterno,
      TipoCurso: curso.IdTipoCurso,
      InicioInscripción: curso.InicioInscr,
      FinInscripción: curso.FinInscr,
      Descripción: curso.Descripcion,
    },
  ];
  const hojaCurso = XLSX.utils.json_to_sheet(datosCurso);

const datosInscritos = inscritos.map((inscrito) => {
  const nota = inscrito.Notas?.[0];
  return {
    ID: inscrito.id,
    Documento: inscrito.docInscr,
    Estado: inscrito.est ? "Activo" : "Inactivo",
    FechaInscripción: new Date(inscrito.fecreg).toLocaleDateString(),
    Nota: nota?.Nota ?? "",
    idRegistro: nota?.idRegistro ?? "",
    FechaRegistro: nota?.FechaRegistro ? new Date(nota.FechaRegistro).toLocaleDateString() : "",
  };
});

  const hojaInscritos = XLSX.utils.json_to_sheet(datosInscritos);

  // 📄 Libro y descarga
  const libro = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(libro, hojaCurso, "Datos del Curso");
  XLSX.utils.book_append_sheet(libro, hojaInscritos, "Inscritos");

  const excelBuffer = XLSX.write(libro, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(blob, `Reporte_Curso_${curso.NombreCurso.replace(/\s+/g, "_")}.xlsx`);
}




  return (
    <div className="p-10 rounded-xl shadow-black fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
     
      {errorMensaje && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-red-600  text-white px-6 py-3 rounded shadow-lg 
        z-50 animate">

        </div> 
      )}
     <div className="bg-white rounded-lg p-6 shadow-md max-w-6xl w-full h-[90vh] overflow-hidden flex flex-col">
        
  

        {/* BARRA DE BUSQUEDA */}
        <div className="flex justify-between items-center mb-4">
        <div className="relative flex items-center"
           onMouseEnter={handleMouseEnter}
           onMouseLeave={handleMouseLeave}>
            <button onClick={() => setIsSearchActive(!isSearchActive)} className="p-2 rounded-full bg-gray-200">
              <MagnifyingGlassIcon className="h-6 w-6 text-[#990000] " />
            </button>
            <input
              type="text"
              placeholder="Busque el nombre del curso"
              value={busqueda}
              onChange={handleBuscar}
              className={`px-4 py-2 border w-9/12 ml-4 rounded-full transition-all duration-500 ease-in-out 
                ${isSearchActive ? "w-96 opacity-100 bg-white shadow-md" : "w-0 opacity-0"} focus:outline-none`}
            />   

     </div>
             <button
            onClick={onClose}
            className=" text-gray-500 hover:text-[#990000] transition-transform duration-300 transform hover:rotate-90 hover:scale-110"
          >
            <XMarkIcon className="h-6 w-6" />
          </button> 
          
        </div>
     

         <div className="w-full flex justify-between text-[#990000] font-semibold px-4 py-2 rounded-t-lg">
           <span className="w-1/5 text-left">Nombre del curso</span>
           
           <span className="w-96 text-right">Inicio Curso</span>
           <span className="w-1/5"></span>
         </div>


        {/* SPINNER DE CARGA */}
        {isLoading && (
          <div className="flex justify-center my-4">
            <div className="w-8 h-8 border-4 border-gray-300 border-t-[#990000] rounded-full animate-spin"></div>
          </div>
        )}

         {/* LISTA DE CURSOS */}
        
         <div className="flex-1 overflow-y-auto max-h-[75vh] space-y-2">
           {cursosFiltrados.length > 0 ? (
            cursosFiltrados.map((curso) => (
              <div key={curso.id} className="border-b py-2">
                <div className="grid grid-cols-4 items-center">
                  <span className="text-left">{curso.NombreCurso}</span>
                   <span></span>
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
                   onClick={() => handleEditarCurso(curso)}
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

                     <button 
                     onClick={() => exportarCursoAExcel(curso)} 
                     className="flex items-center hover:scale-110 active:scale-95 bg-green-600 text-white px-2 py-1 rounded-md hover:bg-green-700 transition"
      
                     title="Eliminar">                    
                
            <ArrowDownTrayIcon className="h-5 w-5"/>
                     </button>
                   </div>


                   {/* CONTENIDO DE CURSO */}
                   {expandedCursoId === curso.id && (
                  
                  
                  <div className=" bg-gray-100 p-4 mt-4 flex flex-col justify-center overflow-x-auto min-w-[1100px]">
                     <div className="w-full flex justify-center">
    <table className="min-w-full table-fixed text-[0.8rem] shadow-md rounded-lg border border-gray-300 bg-white">
      <colgroup>
        <col className="w-[16.6%]" />
        <col className="w-[16.6%]" />
        <col className="w-[16.6%]" />
        <col className="w-[16.6%]" />
        <col className="w-[16.6%]" />
        <col className="w-[16.6%]" />
      </colgroup>
      <thead>
        <tr className="bg-[#990000] text-white">
          <th colSpan={6} className="text-center py-2 text-base font-semibold border-b border-gray-300">
            Datos del Curso
          </th>
        </tr>
        <tr className="bg-gray-100 text-[#990000] font-medium">
          <th className="px-3 py-1 border">ID</th>
          <th className="px-3 py-1 border">Nombre</th>
          <th className="px-3 py-1 border">Valor</th>
          <th className="px-3 py-1 border">Público</th>
          <th className="px-3 py-1 border">Periodo</th>
          <th className="px-3 py-1 border">Cupo Máx</th>
        </tr>
      </thead>
      <tbody>
        <tr className="text-gray-700 text-center">
          <td className="px-3 py-1 border">{curso.id}</td>
          <td className="px-3 py-1 border">{curso.NombreCurso}</td>
          <td className="px-3 py-1 border">{curso.Valor || " - - "}</td>
          <td className="px-3 py-1 border">{curso.Publico}</td>
          <td className="px-3 py-1 border">{curso.Periodo}</td>
          <td className="px-3 py-1 border">{curso.CupoMax}</td>
        </tr>

        <tr className="bg-gray-100 text-[#990000] font-medium">
          <th className="px-3 py-1 border">Inicio</th>
          <th className="px-3 py-1 border">Fin</th>
          <th className="px-3 py-1 border">Horas</th>
          <th className="px-3 py-1 border">Horario</th>
          <th className="px-3 py-1 border">Lugar</th>
          <th className="px-3 py-1 border">Línea</th>
        </tr>
        <tr className="text-gray-700 text-center">
          <td className="px-3 py-1 border">{curso.Inicio}</td>
          <td className="px-3 py-1 border">{curso.Fin}</td>
          <td className="px-3 py-1 border">{curso.Horas}</td>
          <td className="px-3 py-1 border text-left">
           
{formatearHorario(curso).map((h) => (
  <div key={`${curso.id}-${h.dia}`}>
    <strong>{h.dia}</strong> {h.ini} - {h.fin}
  </div>
))}

          </td>
          <td className="px-3 py-1 border">{curso.Lugar}</td>
          <td className="px-3 py-1 border">{curso.Linea}</td>
        </tr>

        <tr className="bg-gray-100 text-[#990000] font-medium">
          <th className="px-3 py-1 border">Estado</th>
          <th className="px-3 py-1 border">Modalidad</th>
          <th className="px-3 py-1 border">Profesor</th>
          <th className="px-3 py-1 border">Segundo Profesor</th>
          <th className="px-3 py-1 border">Profesor Externo</th>
          <th className="px-3 py-1 border">Unidad</th>
        </tr>
        <tr className="text-gray-700 text-center">
          <td className="px-3 py-1 border">{curso.Estado}</td>
          <td className="px-3 py-1 border">{curso.Modalidad}</td>
          <td className="px-3 py-1 border">{curso.NombreProfesor}</td>
          <td className="px-3 py-1 border">{curso.SegundoPro}</td>
          <td className="px-3 py-1 border">{curso.Proexterno}</td>
          <td className="px-3 py-1 border">{curso.Unidad}</td>
        </tr>

        <tr className="bg-gray-100 text-[#990000] font-medium">
          <th className="px-3 py-1 border">Tipo</th>
          <th className="px-3 py-1 border">Inicio Inscripciones</th>
          <th className="px-3 py-1 border">Cierre Inscripciones</th>
          <th className="px-3 py-1 border" colSpan={3}>Descripción</th>
        </tr>
        <tr className="text-gray-700 text-center">
          <td className="px-3 py-1 border">{curso.IdTipoCurso}</td>
          <td className="px-3 py-1 border">{curso.InicioInscr }</td>
          <td className="px-3 py-1 border">{curso.FinInscr}</td>
          <td className="px-3 py-1 border text-left" colSpan={3}>{curso.Descripcion}</td>
        </tr>
      
    </tbody>

          
                    
  </table>
 
 
</div> 
 

{curso.Inscritos && curso.Inscritos !== "[]" && (
  <div className="mt-2 w-full">
    <table className="min-w-full text-[0.8rem] table-fixed border border-gray-300 bg-white shadow-md rounded-lg">
      <thead>
        <tr className="bg-[#990000] text-white">
          <th colSpan={8} className="text-center py-2 text-base font-semibold border-b">
            Inscritos en este curso
          </th>
        </tr>
        <tr className="bg-gray-100 text-[#990000] font-medium">
          <th className="px-3 py-1 border">ID</th>
          <th className="px-3 py-1 border">ID Curso</th>
          <th className="px-3 py-1 border">Documento</th>
          <th className="px-3 py-1 border">Estado</th>
          <th className="px-3 py-1 border">Fecha de Inscripción</th>
          
          <th className="px-3 py-1 border">Calificador</th>
          <th className="px-3 py-1 border">Fecha de Calificación</th>
          <th className="px-3 py-1 border">Nota</th>
        </tr>
      </thead>
      <tbody>
        {JSON.parse(curso.Inscritos).map((inscrito: any) => {
          const nota = inscrito.Notas?.[0] || {};

          return (
            <tr key={inscrito.id} className="text-gray-700 text-center">
              <td className="px-3 py-1 border">{inscrito.id}</td>
              <td className="px-3 py-1 border">{inscrito.idCur}</td>
              <td className="px-3 py-1 border">{inscrito.NombreInscrito}</td>
              <td className="px-3 py-1 border">{inscrito.est ? "Activo" : "Inactivo"}</td>
              <td className="px-3 py-1 border">{new Date(inscrito.fecreg).toLocaleDateString()}</td>
              
              <td className="px-3 py-1 border">{nota.NombreRegistro ?? "—"}</td>
              <td className="px-3 py-1 border">
                {nota.FechaRegistro
                  ? new Date(nota.FechaRegistro).toLocaleDateString()
                  : "—"}
              </td>
             <select
  value={nota?.Nota ?? ""}
  onChange={(e) => {
    // Aquí puedes manejar el cambio de nota si deseas guardarlo
    const nuevaNota = parseInt(e.target.value);
    nota.Nota = nuevaNota; // o setNotas(prev => ...)
  }}
  className="border rounded px-2 py-1"
>
  <option value="">Seleccione</option>
  {especificaciones.map((esp) => (
    <option key={esp.id} value={esp.id}>{esp.Especificacion}</option>
  ))}
</select>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
)}


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
       {showSuccess && (
  <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 z-[9999]">
    <div className="animate-check-spin scale-125">
      <TrashIcon className="h-32 w-32 text-green-500" />
    </div>
    <p className="text-white text-2xl font-bold mt-2 animate-fade-in">Curso eliminado correctamente</p>
  </div>
)}
      

      
       {cursoEditar && (
        <CursoEditarModal
        courseId={cursoEditar.id} 
        onClose={handleCerrarEditor}
        onUpdate={handleUpdate}
        isOpen={true}/>
      ) }
     </div>
   );
 }

Error: In HTML, <select> cannot be a child of <tr>.
This will cause a hydration error.

  ...
    <html lang="es">
      <body className="bg-gray-10...">
        <header>
        <main className={"flex fle..."}>
          <motion.h1>
          <MainButtons publico={2} esAdmin={true} esProfesor={false} onSelect={function onSelect}>
            <div className="flex flex-...">
              <div>
              <CatalogoModal onClose={function onClose}>
                <div className="p-10 round...">
                  <div className="bg-white r...">
                    <div>
                    <div>
                    <div className="flex-1 ove...">
                      <div className="border-b py-2">
                        <div className="grid grid-...">
                          <span>
                          <span>
                          <span>
                          <div>
                          <div className={" bg-gray..."}>
                            <div>
                            <div className="mt-2 w-full">
                              <table className="min-w-full...">
                                <thead>
                                <tbody>
>                                 <tr className="text-gray-700 text-center">
                                    <td>
                                    <td>
                                    <td>
                                    <td>
                                    <td>
                                    <td>
                                    <td>
>                                   <select value={34} onChange={function onChange} className="border rounded px-2 py-1">
                      ...
          ...
        ...

    at createUnhandledError (http://localhost:3000/_next/static/chunks/node_modules_next_dist_client_523921._.js:689:49)
    at handleClientError (http://localhost:3000/_next/static/chunks/node_modules_next_dist_client_523921._.js:856:56)
    at console.error (http://localhost:3000/_next/static/chunks/node_modules_next_dist_client_523921._.js:991:56)
    at validateDOMNesting (http://localhost:3000/_next/static/chunks/node_modules_next_dist_compiled_react-dom_1f56dc._.js:1804:212)
    at completeWork (http://localhost:3000/_next/static/chunks/node_modules_next_dist_compiled_react-dom_1f56dc._.js:7273:25)
    at runWithFiberInDEV (http://localhost:3000/_next/static/chunks/node_modules_next_dist_compiled_react-dom_1f56dc._.js:631:20)
    at completeUnitOfWork (http://localhost:3000/_next/static/chunks/node_modules_next_dist_compiled_react-dom_1f56dc._.js:8020:23)
    at performUnitOfWork (http://localhost:3000/_next/static/chunks/node_modules_next_dist_compiled_react-dom_1f56dc._.js:7957:28)
    at workLoopSync (http://localhost:3000/_next/static/chunks/node_modules_next_dist_compiled_react-dom_1f56dc._.js:7847:40)
    at renderRootSync (http://localhost:3000/_next/static/chunks/node_modules_next_dist_compiled_react-dom_1f56dc._.js:7830:13)
    at performWorkOnRoot (http://localhost:3000/_next/static/chunks/node_modules_next_dist_compiled_react-dom_1f56dc._.js:7565:211)
    at performSyncWorkOnRoot (http://localhost:3000/_next/static/chunks/node_modules_next_dist_compiled_react-dom_1f56dc._.js:8402:9)
    at flushSyncWorkAcrossRoots_impl (http://localhost:3000/_next/static/chunks/node_modules_next_dist_compiled_react-dom_1f56dc._.js:8326:245)
    at processRootScheduleInMicrotask (http://localhost:3000/_next/static/chunks/node_modules_next_dist_compiled_react-dom_1f56dc._.js:8343:9)
    at http://localhost:3000/_next/static/chunks/node_modules_next_dist_compiled_react-dom_1f56dc._.js:8413:126
