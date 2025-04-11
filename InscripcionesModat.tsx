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
  };
  docInscr: string;
  nombre: string;
  est: number;
  fecreg: string;
}

interface InscripcionesModalProps {
  onClose: () => void;
}

interface Nota {
  id: number;
  idCurso:  number;
  idInscrito: number; 
  Nota: number;
  Especificacion: string; 
  NombreCurso: string;
}

export default function InscripcionesModal({ onClose }: InscripcionesModalProps) {
  const [inscripciones, setInscripciones] = useState<Inscripcion[]>([]);
  const [inscripcionesFiltradas, setInscripcionesFiltradas] = useState<Inscripcion[]>([]);
  const [expandedCourses, setExpandedCourses] = useState<{ [key: number]: boolean }>({});
  const [busqueda, setBusqueda] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [nota, setNota] = useState<any[]>([]);
  const [modalCalificarAbierto, setModalCalificarAbierto] = useState(false);
  const [inscritoSeleccionado, setInscritoSeleccionado] = useState<{nombre: string, doc:string} | null>(null);

  useEffect(() => {
    const fetchInscripciones = async () => {
      try {
        const response = await fetch("http://localhost:8090/api/inscripciones");
        if (!response.ok) throw new Error("Error al obtener inscripciones");

        const data: Inscripcion[] = await response.json();
        console.log("Datos recibidos en el frontend:", JSON.stringify(data, null, 2 ));

        setTimeout(()  => {
        setInscripciones(data);
        setInscripcionesFiltradas(data);
        setIsLoading(false);
      }, 1000);
      } catch (error) {
        console.error("Error al obtener inscripciones:", error);
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

    const fechaRegistro = new Date(inscripcion.fecreg).toLocaleDateString();
    const idCurso =
      String(inscripcion.idCur || inscripcion.Cursos?.id || inscripcion.curso?.id || "");
    const nombreInscrito = String(inscripcion.nombre || "");  
    const docInscrito = String(inscripcion.docInscr || "");  

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



useEffect(()  => {
  async function fetcNotas() {
    try {
      const response = await fetch("http://localhost:8090/api/Notas");
      if (!response.ok) throw new Error("Error al obtener los periodos");

      const data = await response.json();
      console.log("Notas recibidas:", data);  // <-- Agrega esto
      setNota(data);
    } catch(error){
      console.error("Error cargando lista de periodos:", error);
    }
  }
  fetcNotas(); 
}, []);


const abrirModalCalificar = async (nombre: string, doc: string) => {
  setInscritoSeleccionado({ nombre, doc });
  setModalCalificarAbierto(true);

  try {
    const response = await fetch(`http://localhost:8090/api/Notas/${doc}`);
    if (!response.ok) throw new Error("Error al obtener notas");

    const notasData: Nota[] = await response.json();

    // Fusiona las nuevas notas con las anteriores, reemplazando las del mismo idInscrito
    setNota((prevNotas) => {
      const nuevasNotas = notasData.map(notaNueva => ({
        ...notaNueva,
        idInscrito: Number(doc)
      }));
      const otrasNotas = prevNotas.filter(n => n.idInscrito !== Number(doc));
      return [...otrasNotas, ...nuevasNotas];
    });
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
  const idInscrito = Number(inscritoSeleccionado.doc); // o usar como string si tu backend lo trata así
  const Nota = Number(notaTexto); // asegúrate de que sea número si lo esperas así
  const idRegistro = 1; // aquí deberías poner el ID del usuario que registra (puede ser dinámico)

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
    // {curso.NombreCurso || curso.Cursos?.NombreCurso || curso.curso?.NombreCurso || "Desconocido"}
    "Nombre del Curso": inscripcion.Cursos?.NombreCurso || inscripcion.curso?.NombreCurso || "Desconocido",
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
    <div className="p-6 rounded-lg shadow-lg fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
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
                                  .filter((inscripciones) => Number(inscripciones.est) ===1)
                                  .map((inscripciones, index) => (
                                    <tr key={inscripciones.id} className={`${index % 2 === 0 ? "bg-gray-200" : "bg-white"} text-center transition`}>
                                      <td className=" p-1">{inscripciones.nombre || "No disponible"}</td>
                                      <td className=" p-1 ">{inscripciones.docInscr}</td>
                                      <td className=" p-1">{inscripciones.fecreg}</td>
                                      <td className="p-1 flex flex-col items-center gap-1">
  {
    (() => {
      const notaEncontrada = nota.find(n => 
        n.idInscrito === Number(inscripciones.docInscr) && 
        n.idCurso === Number(cursoId)
      );
      return (
        <>
          {notaEncontrada && (
            <span className="text-black font-semibold text-sm">
               {notaEncontrada.Listas?.Especificacion}
            </span>
          )}
          <button
    onClick={() =>
      abrirModalCalificar(inscripciones.nombre, inscripciones.docInscr)
    }
    className={`inline-flex items-center gap-1 px-3 py-1 rounded-md transition hover:scale-110 active:scale-95 ${
      notaEncontrada
        ? "bg-blue-600 hover:bg-blue-700"
        : "bg-green-600 hover:bg-green-700"
    } text-white`}
  >
    {notaEncontrada ? (
      <>
        <PencilIcon className="w-4 h-4" />
        <span>Editar</span>
      </>
    ) : (
      <>
        <PlusCircleIcon className="w-4 h-4" />
        <span>Calificar</span>
      </>
    )}
  </button>
        </>
      );
    })()
  }
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
