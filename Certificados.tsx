http://localhost:8090/api/notas


import React, { useState, useEffect } from "react";
import {
  XMarkIcon,
  MagnifyingGlassIcon,
  ArrowDownTrayIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  PlusCircleIcon,
  DocumentPlusIcon,
  PencilIcon,
} from "@heroicons/react/24/solid";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import CalificarModalProps from "./calificarmodal";
import { MagnifyingGlassPlusIcon, PlusIcon } from "@heroicons/react/20/solid";

interface Inscripcion {
  NombreCurso: string;
  id: number;
  idCur: number;
  docInscr: number;
  nombre: string;
  Est: string;
  fecreg: string;
  Nota: number;
  Especificacion: string;
  Inicio: string;
  Fin: string;
  Profesor: number;
  idNotas: number;
}

interface InscripcionesModalProps {
  onClose: () => void;
}


interface OpcionLista {
  id: number;
  Especificacion: string;
}

const InscripcionesModal: React.FC<InscripcionesModalProps> = ({ onClose }) => {
  const [inscripciones, setInscripciones] = useState<Inscripcion[]>([]);
  const [inscripcionesFiltradas, setInscripcionesFiltradas] = useState<Inscripcion[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [expandedCursos, setExpandedCursos] = useState<{ [key: number]: boolean }>({});
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [modalCalificarAbierto, setModalCalificarAbierto] = useState(false);
  const [inscritoSeleccionado, setInscritoSeleccionado] = useState<{nombre: string, doc:number, idCur: number, Especificacion: string, id: number, idNotas: number} | null>(null);
  const [opciones, setOpciones] = useState<OpcionLista[]>([]);
   const [notaSeleccionada, setNotaSeleccionada] = useState<number | null>(null);
 
   const [guardando, setGuardando] = useState(false);
   const [notaExistenteId, setNotaExistenteId] = useState<number | null>(null);

useEffect(() => {
  const fetchInscripciones = async () => {
    try {
      const idProfesor = localStorage.getItem("id_emp");
      if (!idProfesor) return;

      const response = await fetch(`http://localhost:8090/api/inscripciones/cursos/${idProfesor}`);
      const data: Inscripcion[] = await response.json();
      setInscripciones(data);
      setInscripcionesFiltradas(data);
    } catch (error) {
      console.error("Error al obtener inscripciones:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchOpciones = async () => {
  try {
    const respOpciones = await fetch("http://localhost:8090/api/listas/Especificaciones");
    if (!respOpciones.ok) throw new Error("Error al obtener lista de especificaciones");
    const dataOpciones = await respOpciones.json();
    console.log("Opciones recibidas:", dataOpciones); 
    setOpciones(dataOpciones);
  } catch (error) {
    console.error("Error al obtener opciones:", error);
  }
};

  fetchInscripciones();
  fetchOpciones();
}, []);


  const handleBuscar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const texto = e.target.value.toLowerCase();
    setBusqueda(texto);

    const filtrados = inscripciones.filter((inscripcion) => {
      const cursoNombre = inscripcion.NombreCurso || "";
      const fechaRegistro = new Date(inscripcion.fecreg).toLocaleDateString();
      const idCurso = String(inscripcion.idCur );
      const nombreInscrito = inscripcion.nombre.toLowerCase();
      const docInscrito = inscripcion.docInscr;

      return (
        idCurso.includes(texto) ||
        cursoNombre.toLowerCase().includes(texto) ||
        fechaRegistro.includes(texto) ||
        nombreInscrito.includes(texto) ||
        docInscrito
      );
    });

    setInscripcionesFiltradas(filtrados);
  };

  const groupedInscripciones = inscripcionesFiltradas.reduce((acc, inscripcion) => {
    const cursoId = inscripcion.idCur ;
    if (!acc[cursoId]) acc[cursoId] = [];
    acc[cursoId].push(inscripcion);
    return acc;
  }, {} as { [key: number]: Inscripcion[] });

  const toggleCurso = (cursoId: number) => {
    setExpandedCursos((prev) => ({
      ...prev,
      [cursoId]: !prev[cursoId],
    }));
  };

  const handleDownloadExcelByCurso = (cursoId: number) => {
    const datosCurso = inscripcionesFiltradas.filter(
      (inscripcion) => inscripcion.idCur === cursoId
    );

    const data = datosCurso.map((inscripcion) => ({
      "ID Curso": inscripcion.idCur,
      "Nombre del Curso": inscripcion.NombreCurso || "Desconocido",
      Documento: inscripcion.docInscr,
      Nombre: inscripcion.nombre,
      Estado: inscripcion.Est,
      "Fecha Registro": new Date(inscripcion.fecreg).toLocaleDateString(),
    }));

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Inscripciones");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, `Inscripciones_Curso_${cursoId}.xlsx`);
  };

  const handleMouseEnter = () => {
    setIsSearchActive(true);
  };

  const handleMouseLeave = () => {
    if (busqueda === "") {
      setIsSearchActive(true);
    }
  };

  const handleChangeEspecificacion = (idNotas: number, nuevaEspecificacion: string) => {
  setInscripciones((prev) =>
    prev.map((inscripcion) =>
      inscripcion.idNotas === idNotas
        ? { ...inscripcion, Especificacion: nuevaEspecificacion }
        : inscripcion
    )
  );
};
 


 


  return (
    <div className="p-6 rounded-lg shadow-black fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative flex flex-col gap-4 w-full max-w-5xl bg-white py-8 px-10 rounded-lg shadow-md max-h-[98vh] overflow-y-auto">
        {/* BOTÓN CERRAR */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-[#990000] transition-transform duration-300 transform hover:rotate-90 hover:scale-110"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        <h2 className="text-3xl font-bold text-[#990000] text-center seleccion-personalizada">Lista de Inscritos</h2>

        {/* BUSCADOR */}
        {/* BARRA DE BÚSQUEDA ANIMADA */}
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
                     className={`px-4 w-9/12 ml-4 py-2 border rounded-full transition-all duration-500 ease-in-out 
                       ${isSearchActive ? "w-96 opacity-100 bg-white shadow-md" : "w-0 opacity-0"} focus:outline-none`}
                   /> 
                   </div>

        {/* LISTADO DE CURSOS */}
        {isLoading ? (
          <div className="flex justify-center my-4">
            <div className="w-8 h-8 border-4 border-gray-300 border-t-[#990000] rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="space-y-4">
           
{Object.entries(groupedInscripciones).map(([cursoId, inscripciones]) => {
  const cursoAbierto = expandedCursos[Number(cursoId)] || false;
  const cursoNombre = inscripciones[0]?.NombreCurso || `Curso ${cursoId}`;
  const fechaInicio = inscripciones[0]?.Inicio
    ? new Date(inscripciones[0].Inicio).toLocaleDateString()
    : "Sin fecha";
  const fechaFin = inscripciones[0]?.Fin
    ? new Date(inscripciones[0].Fin).toLocaleDateString()
    : "Sin fecha";

  return (
    


 <div key={cursoId} className="border border-gray-300 rounded shadow-md ">
      <div className="flex justify-between items-center bg-gray-100 px-4 py-3">
        <div>
          <h3 className="text-lg font-bold text-[#990000] seleccion-personalizada">{cursoNombre}</h3>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Inicio:</span> {fechaInicio} &nbsp; | &nbsp;
            <span className="font-medium">Fin:</span> {fechaFin}
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => handleDownloadExcelByCurso(Number(cursoId))}
            className="flex items-center  hover:scale-110 active:scale-95 bg-green-600 text-white px-3 py-1.5 rounded-md hover:bg-green-700 transition"
          >
            <ArrowDownTrayIcon className="h-5 w-5 mr-1" />
            Descargar
          </button>
          <button
            onClick={() => toggleCurso(Number(cursoId))}
            className="flex items-center bg-[#990000] text-white px-3 py-1.5 rounded-md hover:bg-[#7a0000] transition hover:scale-110 active:scale-95"
          >
            {cursoAbierto ? (
              <>
                <ChevronUpIcon className="h-5 w-5 mr-1" />
                Ver menos
              </>
            ) : (
              <>
                <ChevronDownIcon className="h-5 w-5 mr-1" />
                Ver más
              </>
            )}
          </button>
        </div>
      </div>

  {cursoAbierto && (
    <div className="px-6 py-4 border border-gray-200 bg-white animate-fade-in rounded-b-lg">
      <h3 className="text-lg font-semibold text-[#990000] mb-4 ">Inscritos</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto text-sm  border border-gray-300">
          <thead className="bg-[#990000] text-white">
            <tr>
              <th className="px-4 py-2 text-left">Nombre</th>
              <th className="px-4 py-2 text-left">Documento</th>
              <th className="px-4 py-2 text-left">Fecha Inscripción</th>
              <th className="px-4 py-2 text-left">Nota</th>
            </tr>
          </thead>
          <tbody>
            {inscripciones.map((insc, index) => (
              <tr
                key={insc.id}
                className={`border-b ${index % 2 === 0 ? 'bg-gray-50' : 'bg-gray-150'} hover:bg-gray-200 transition-all duration-200`}
              >
                <td className="px-4 py-2 text-black">{insc.nombre}</td>
                <td className="px-4 py-2 text-black">{insc.docInscr}</td>
                <td className="px-4 py-2 text-black">{new Date(insc.fecreg).toLocaleDateString()}</td>
                
    <td className="px-4 py-2">
  <select
    className="border rounded px-2 py-1 text-sm bg-white"
    value={insc.Especificacion || ""}
    onChange={(e) => handleChangeEspecificacion(insc.id, e.target.value)}
    disabled
  >
    <option value="">-- Selecciona --</option>
    {opciones.map((opcion) => (
      <option key={opcion.id} value={opcion.Especificacion}>
        {opcion.Especificacion}
      </option>
    ))}
  </select>
</td>
           
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )}
</div>



              );
            })}
          </div>
        )}
      </div>


    </div>
  );
};

export default InscripcionesModal;
