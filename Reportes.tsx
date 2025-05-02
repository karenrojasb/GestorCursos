import { useState, useEffect } from "react";
import { XMarkIcon, MagnifyingGlassIcon, ArrowDownTrayIcon, PencilIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
import React from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

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
interface Inscripcion {
  NombreCurso: string | undefined;
  id: number;
  idCur?: number;
  Cursos?: {
    id: number;
    NombreCurso: string;
  };
  curso?: {
    id: number;
    NombreCurso: string;
    id_emp: number;
  };
  docInscr: string;
  nombre: string;
  est: number;
  fecreg: string;
  Nota: number;
  Especificacion: string; 
}

interface InscripcionesModalProps {
  onClose: () => void;
}



export default function ReportesModal({ onClose }: InscripcionesModalProps) {
  const [inscripciones, setInscripciones] = useState<Inscripcion[]>([]);
  const [inscripcionesFiltradas, setInscripcionesFiltradas] = useState<Inscripcion[]>([]);
  const [expandedCourses, setExpandedCourses] = useState<{ [key: number]: boolean }>({});
  const [busqueda, setBusqueda] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [modalCalificarAbierto, setModalCalificarAbierto] = useState(false);
  const [inscritoSeleccionado, setInscritoSeleccionado] = useState<{nombre: string, doc:string} | null>(null);
  const [idProfesor, setIdProfesor] = useState<number | null>(null);



  useEffect(() => {
   const id = localStorage.getItem("id_emp");
    if (id) setIdProfesor(Number(id));
  }, []);

  useEffect(() => {
    const fetchInscripciones = async () => {
      try {
        const idProfesor = localStorage.getItem('id_emp');
        if (!idProfesor) {
          console.error('ID del profesor no encontrado en localStorage');
          return;
        }
        const response = await fetch(`http://localhost:8090/api/inscripciones/cursos/${idProfesor}`);
        if (!response.ok) throw new Error("Error al obtener inscripciones");
    
        const data: Inscripcion[] = await response.json();
        console.log("Datos recibidos en el frontend:", JSON.stringify(data, null, 2));
    
        setInscripciones(data);
        setInscripcionesFiltradas(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error al obtener cursos del profesor:', error);
        setIsLoading(false);
      }
    };
  
    fetchInscripciones();
  }, []);


  // FILTRAR INSCRIPCIONES EN TIEMPO REAL
  
const handleBuscar = (e: React.ChangeEvent<HTMLInputElement>) => {
  const texto = e.target.value.toLowerCase();
  setBusqueda(texto);

  const filtrados = inscripciones.filter((inscripcion) => {
    const cursoNombre =
      inscripcion.Cursos?.NombreCurso ||
      inscripcion.curso?.NombreCurso ||
      inscripcion.NombreCurso ||
      "";
    console.log("Curso Nombre:", cursoNombre);
  
    const fechaRegistro = new Date(inscripcion.fecreg).toLocaleDateString();
    console.log("Fecha Registro:", fechaRegistro);
  
    const idCurso =
      String(inscripcion.idCur || inscripcion.Cursos?.id || inscripcion.curso?.id || "");
    console.log("ID Curso:", idCurso);
  
    const nombreInscrito = String(inscripcion.nombre || "");
    console.log("Nombre Inscrito:", nombreInscrito);
  
    const docInscrito = String(inscripcion.docInscr || "");
    console.log("Documento Inscrito:", docInscrito);
  
    return (
      idCurso.includes(texto) ||
      cursoNombre.toLowerCase().includes(texto) ||
      fechaRegistro.includes(texto) ||
      nombreInscrito.toLowerCase().includes(texto) ||
      docInscrito.includes(texto)
    );
  });

  setInscripcionesFiltradas(filtrados);
};




  // AGRUPAR INSCRIPCIONES POR IDCUR
  const groupedInscripciones = inscripcionesFiltradas.reduce((acc, inscripcion) => {
    const cursoId = inscripcion.idCur || inscripcion.Cursos?.id || inscripcion.curso?.id || 0;
    if (!acc[cursoId]) {
      acc[cursoId] = [];
    }
    acc[cursoId].push(inscripcion);
    return acc;
  }, {} as { [key: number]: Inscripcion[] });
  
  console.log("Grouped Inscripciones:", groupedInscripciones);

  // AALTERAR EXPANSIÓN DE CURSO
  const toggleExpand = (cursoId: number) => {
    setExpandedCourses((prev) => ({ ...prev, [cursoId]: !prev[cursoId] }));
  };


  const handleMouseEnter = () => {
    setIsSearchActive(true);
  };

  const handleMouseLeave = () => {
    if (busqueda === "") {
      setIsSearchActive(true);
    }
  };

  const exportarCursoAExcel = (curso: Curso, inscripciones: Inscripcion[]) => {
    // Datos del curso
    const datosCurso = [
      {
        ID: curso.id,
        Nombre: curso.NombreCurso,
        Valor: curso.Valor,
        Público: curso.Publico,
        Periodo: curso.Periodo,
        Inicio: curso.Inicio,
        Fin: curso.Fin,
        Horas: curso.Horas,
        Lugar: curso.Lugar,
        Línea: curso.Linea,
        Estado: curso.Estado,
        Modalidad: curso.Modalidad,
        Profesor: curso.NombreProfesor,
        SegundoPro:curso.SegundoPro,
        ProfesorExterno: curso.Proexterno,
        Unidad: curso.Unidad,
        Descripción: curso.Descripcion,
      },
    ];
  
    // Datos de inscritos
    const datosInscritos = inscripciones.map(i => ({
      Documento: i.docInscr,
      Nombre: i.nombre,
      FechaRegistro: new Date(i.fecreg).toLocaleDateString(),
      Nota: '', 
      Calificador: '',
      FechaCalificación: '',
    }));
  
    // Crear hojas de Excel
    const hojaCurso = XLSX.utils.json_to_sheet(datosCurso);
    const hojaInscritos = XLSX.utils.json_to_sheet(datosInscritos);
  
    const libro = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(libro, hojaCurso, "Curso");
    XLSX.utils.book_append_sheet(libro, hojaInscritos, "Inscritos");
  
    const excelBuffer = XLSX.write(libro, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
  
    saveAs(blob, `Curso_${curso.NombreCurso}.xlsx`);
  };


  


  return (
    <div className="fixed inset-0 flex items-center justify-center bg bg-opacity-50 z-50">
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl h-[90vh] ">
        
       {/* BOTÓN CERRAR */}
              <button
                onClick={onClose}
                className="absolute top-2 right-2 text-gray-500 hover:text-[#990000] transition-transform duration-300 transform hover:rotate-90 hover:scale-110"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
              <h2 className="text-2xl justify-center text-center font-bold text-[#990000]">Reportes</h2>
     
          <div className="flex items-center space-x-4 mt-4">
            
  

</div>


         <div className="w-full  justify-between grid grid-cols-5 text-[#990000] font-semibold px-4 py-2 rounded-t-lg">
           <span className=" text-left">Nombre del curso</span>
           <span></span>
           <span></span>
           <span className=" text-center">Inicio Curso</span>
          
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
                <div className="grid grid-cols-5 items-center">
                  <span className="text-left ">{curso.NombreCurso}</span>
                  <span></span>
                  <span></span>
                  <span className="text-center">{curso.Inicio || "dd/mm/aaaa"}</span>

                  {/* BOTONES */}
                 
                  {/* BOTÓN PARA VER MÁS */}
                  <div className="flex space-x-2">
                    
                    {/* BOTÓN VER MÁS */}
                    <button 
                    onClick={() => handleVerMas(curso.id)} 
                    className="bg-[#990000] hover:bg-red-700 text-white px-2 py-1 text-base rounded transition-transform hover:scale-110 active:scale-95">
                      {expandedCursoId === curso.id ? "Ver menos" : "Ver más"}
                    </button>
                    
                    {/* BOTÓN EXPORTAR */}
                    <button
                    onClick={() => exportarCursoAExcel(curso, showInscripciones)}
                    className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded transition-transform hover:scale-110 active:scale-95 items-center text-base"
                     >
                    <ArrowDownTrayIcon className="h-5 w-5 text-center"/>
                    Exportar
                   </button>
                   </div>


                   {/* CONTENIDO DE CURSO */}
                   {expandedCursoId === curso.id && (
  <div className="relative bg-gray-100 p-4 mt-4 flex justify-center overflow-x-auto min-w-[790px]">
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
            {formatearHorario(curso).map((h, i) => (
              <div key={i}>
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
          <td className="px-3 py-1 border">{curso.SegundoPro  || " - - "}</td>
          <td className="px-3 py-1 border">{curso.Proexterno || " - - "}</td>
          <td className="px-3 py-1 border">{curso.Unidad}</td>
        </tr>

        <tr className="bg-gray-100 text-[#990000] font-medium">
          <th className="px-3 py-1 border">Tipo</th>
          <th className="px-3 py-1 border" colSpan={5}>Descripción</th>
        </tr>
        <tr className="text-gray-700 text-center">
          <td className="px-3 py-1 border">{curso.IdTipoCurso}</td>
          <td className="px-3 py-1 border text-left" colSpan={5}>{curso.Descripcion  || "Sin descripción"}</td>
        </tr>

        {showInscripciones.length > 0 && (
          <>
            <tr className="bg-[#990000] text-white font-semibold">
              <th colSpan={6} className="px-3 py-2 text-left">
                Inscritos en el Curso
              </th>
            </tr>
            <tr className="bg-gray-100 text-[#990000] font-medium">
              <th className="px-3 py-1 border">Documento</th>
              <th className="px-3 py-1 border">Nombre</th>
              <th className="px-3 py-1 border">Fecha Registro</th>
              <th className="px-3 py-1 border">Nota</th>
              <th className="px-3 py-1 border">Calificador</th>
              <th className="px-3 py-1 border">Fecha Calificación</th>
            </tr>
            {showInscripciones.map((ins, i) => (
              <tr key={i} className="text-gray-700 text-center even:bg-gray-50 text-xs">
                <td className="px-1 py-1 border">{ins.docInscr}</td>
                <td className="px-1 py-1 border">{ins.nombre || "No disponible"}</td>
                <td className="px-1 py-1 border">{new Date(ins.fecreg).toLocaleDateString()}</td>
                <td className="px-1 py-1 border"></td>
                <td className="px-1 py-1 border"></td>
                <td className="px-1 py-1 border"></td>
              </tr>
            ))}
          </>
        )}
  
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
 
  </div>
    
   );
 }
