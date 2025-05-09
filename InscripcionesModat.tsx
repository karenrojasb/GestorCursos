import { useState, useEffect } from "react";
import { XMarkIcon, MagnifyingGlassIcon, ArrowDownTrayIcon, PencilIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
import React from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import CalificarModalProps from "./calificarmodal";

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



export default function InscripcionesModal({ onClose }: InscripcionesModalProps) {
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




const abrirModalCalificar = async (nombre: string, doc: string) => {
  setInscritoSeleccionado({ nombre, doc });
  setModalCalificarAbierto(true);

  try {
    const response = await fetch(`http://localhost:8090/api/Notas/${doc}`);
    if (!response.ok) throw new Error("Error al obtener notas");

    // Fusiona las nuevas notas con las anteriores, reemplazando las del mismo idInscrito
   
  } catch (error) {
    console.error("Error al obtener notas del inscrito:", error);
  }
};

const guardarNota = async (notaTexto: string) => {
  if (!inscritoSeleccionado) return;

  const cursoId = Object.keys(groupedInscripciones).find(cursoId =>
    groupedInscripciones[Number(cursoId)].some(ins =>
      ins.docInscr === inscritoSeleccionado.doc
    )
  );

  const idCurso = Number(cursoId);
  const idInscrito = Number(inscritoSeleccionado.doc); 
  const Nota = Number(notaTexto); 
  const idRegistro = 1; 

  try {
    const response = await fetch("http://localhost:8090/api/Notas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        idCurso,
        idInscrito,
        Nota,
        idRegistro,
      }),
    });

    if (!response.ok) throw new Error("Error al guardar la nota");

    console.log("Nota guardada exitosamente");
  } catch (error) {
    console.error("Error al guardar nota:", error);
  }
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

  const handleDownloadExcelByCurso = (cursoId: number) => {
  // Filtrar las inscripciones solo de ese curso
  const datosCurso = inscripcionesFiltradas.filter(
    (inscripcion) => (inscripcion.idCur || inscripcion.Cursos?.id || inscripcion.curso?.id) === cursoId
  );

  if (datosCurso.length === 0) {
    alert("No hay inscripciones en este curso.");
    return;
  }

  // Formatear los datos
  const data = datosCurso.map((inscripcion) => ({
    "ID Curso": inscripcion.idCur || inscripcion.Cursos?.id || inscripcion.curso?.id,


    "Nombre del Curso": inscripcion.NombreCurso  || "Desconocido",
    "Documento": inscripcion.docInscr,
    "Nombre": inscripcion.nombre,
    "Estado": inscripcion.est === 1 ? "Inscrito" : "Cancelado",
    "Fecha Registro": new Date(inscripcion.fecreg).toLocaleDateString(),
  }));

  // Crear libro de Excel
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(data);
  XLSX.utils.book_append_sheet(workbook, worksheet, "Inscripciones");

  // Generar archivo y descargarlo
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
  saveAs(blob, `Inscripciones_Curso_${cursoId}.xlsx`);
};



  return (
    <div className="p-6 rounded-lg shadow-black fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative flex flex-col  gap-4 w-full max-w-4xl bg-white py-8 px-10 rounded-lg shadow-md  min-h-[800px]">
        
        {/* BOTÓN CERRAR */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-[#990000] transition-transform duration-300 transform hover:rotate-90 hover:scale-110"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        {/* TÍTULO */}
        <h2 className="text-3xl font-bold text-[#990000] text-center">Lista de Inscripciones</h2>

        {/* BARRA DE BÚSQUEDA ANIMADA */}
        <div className="relative flex items-center"
           onMouseEnter={handleMouseEnter}
           onMouseLeave={handleMouseLeave}>
            <button onClick={() => setIsSearchActive(!isSearchActive)} className="p-2 rounded-full bg-gray-200">
              <MagnifyingGlassIcon className="h-6 w-6 text-[#990000]" />
            </button>
            <input
              type="text"
              placeholder="Buscar por ID, Nombre o Fecha"
              value={busqueda}
              onChange={handleBuscar}
              className={`px-4 py-2 border rounded-full transition-all duration-500 ease-in-out 
                ${isSearchActive ? "w-96 opacity-100 bg-white shadow-md" : "w-0 opacity-0"} focus:outline-none`}
            /> 
            </div>


        {/* LISTA DE INSCRIPCIONES */}
        <div className="w-full max-h-[600px] overflow-auto border border-white rounded-md shadow-sm">
        
          {isLoading ? (
             <div className="flex justify-center py-4">
             <div className="w-8 h-8 border-4 border-gray-300 border-t-[#990000] rounded-full animate-spin"></div>
           </div>
          )
          : Object.entries(groupedInscripciones).length > 0 ? (
            
<table className="w-full border-collapse border border-white">
  <thead className="bg-[#990000] text-white border-gray-100">
    <tr>
      <th className="border p-3 w-[10%] text-center">ID Curso</th>
      <th className="border p-3 w-[50%] text-center">Nombre del Curso</th>
      <th className="border p-3 w-[20%] text-center">Fecha Registro</th>
      <th className="border p-3 w-[50%] text-center">Acciones</th>
    </tr>
  </thead>
  <tbody>
    {Object.entries(groupedInscripciones).map(([cursoId, inscripciones], index) => {
      const curso = inscripciones[0];
      return (
        <React.Fragment key={cursoId}>
          <tr className={`${index % 2 === 0 ? "bg-white" : "bg-gray-100"} text-center transition`}>
            <td className="border border-gray-300 p-3">{cursoId}</td>
            <td className="border border-gray-300 p-3 max-w-[250px] break-words">
              {curso.NombreCurso || curso.Cursos?.NombreCurso || curso.curso?.NombreCurso || "Desconocido"}
            </td>
            <td className="border border-gray-300 p-3">{new Date(curso.fecreg).toLocaleDateString()}</td>
            <td className="border border-gray-300 p-3  flex justify-center gap-3">
              <button
                onClick={() => toggleExpand(Number(cursoId))}
                className="bg-[#990000] text-white px-3 rounded-md hover:bg-red-700 transition hover:scale-110 active:scale-95"
              >
                {expandedCourses[Number(cursoId)] ? "Ver menos" : "Ver más"}
              </button>

              <button
                onClick={() => handleDownloadExcelByCurso(Number(cursoId))}
                className="flex items-center gap-3 bg-green-600 text-white px-1 py-1 rounded-md hover:bg-green-700 transition hover:scale-110 active:scale-95"
              >
                <ArrowDownTrayIcon className="w-5 h-5" />
                Descargar
              </button>
            </td>

          </tr>

                      {expandedCourses[Number(cursoId)] && (
                        <tr>
                          <td colSpan={4}>
                            <div className="p-3 bg-gray-50 border border-gray-300 rounded-md shadow-md mt-2">
                              <h3 className="text-md font-semibold text-[#990000] mb-2 text-center">Lista de Inscritos</h3>

                         
                              <table className="w-full border-collapse">
                                <thead className="bg-[#990000] text-white text-sm">
                                  <tr >
                                    <th className="p-1 text-center">Nombre del inscrito</th>
                                    <th className="p-1 text-center">Numero de documento</th>
                                    <th className="p-1 text-center">Fecha de inscripción</th>
                                    <th className="p-1 text-center">Calificación</th>
                                  </tr>
                                </thead>
                                <tbody className="text-sm">
                                  {inscripciones
                         
                                  .map((inscripciones, index) => (
                                    <tr key={inscripciones.id} className={`${index % 2 === 0 ? "bg-gray-200" : "bg-white"} text-center transition`}>
                                      <td className=" p-1">{inscripciones.nombre || "No disponible"}</td>
                                      <td className=" p-1 ">{inscripciones.docInscr}</td>
                                      <td className=" p-1">{inscripciones.fecreg}</td>
                                     
                                      <td className="p-1 text-gray-600 flex flex-col items-center gap-1">
                                      {inscripciones.Especificacion || "Sin Nota"}
                                      <button 
        onClick={() =>
          abrirModalCalificar(inscripciones.nombre, inscripciones.docInscr)
        }
    
    className="inline-flex items-center text-white gap-1 px-3 py-1 rounded-md transition hover:scale-110 active:scale-95 bg-green-600 hover:bg-green-700">
      <PlusCircleIcon className="w-4 h-4" />
      <span>Calificar</span>
    </button>

</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                              </div>
                         
                            
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
                  </table>
          ) : (
            <div className="text-center py-4 text-gray-500">No hay inscripciones registradas.</div>
          )} 
        </div>
        {modalCalificarAbierto && inscritoSeleccionado && (
  <CalificarModalProps
            nombre={inscritoSeleccionado.nombre}
            documento={inscritoSeleccionado.doc}
            onClose={() => setModalCalificarAbierto(false)}
            onGuardar={guardarNota} idCurso={0}  />
)}
      </div>
      
    </div>
  );
}
