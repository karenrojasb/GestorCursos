import { useState, useEffect } from "react";
import { XMarkIcon, MagnifyingGlassIcon, ArrowDownTrayIcon } from "@heroicons/react/24/solid";
import React from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

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

export default function InscripcionesModal({ onClose }: InscripcionesModalProps) {
  const [inscripciones, setInscripciones] = useState<Inscripcion[]>([]);
  const [inscripcionesFiltradas, setInscripcionesFiltradas] = useState<Inscripcion[]>([]);
  const [expandedCourses, setExpandedCourses] = useState<{ [key: number]: boolean }>({});
  const [busqueda, setBusqueda] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSearchActive, setIsSearchActive] = useState(false);

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
      const cursoNombre = inscripcion.Cursos?.NombreCurso || inscripcion.curso?.NombreCurso || "";
      const fechaRegistro = new Date(inscripcion.fecreg).toLocaleDateString();

      return (
        inscripcion.idCur?.toString().includes(texto) ||
        cursoNombre.toLowerCase().includes(texto) ||
        fechaRegistro.includes(texto)
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
      <div className="relative flex flex-col items-center gap-4 w-full max-w-4xl bg-white py-8 px-10 rounded-lg shadow-md  min-h-[800px]">
        
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
        <div className="w-full max-h-[600px] overflow-auto border border-gray-300 rounded-md shadow-sm">
        
          {isLoading ? (
             <div className="flex justify-center py-4">
             <div className="w-8 h-8 border-4 border-gray-300 border-t-[#990000] rounded-full animate-spin"></div>
           </div>
          )
          : Object.entries(groupedInscripciones).length > 0 ? (
            <table className="w-full border-collapse border border-gray-300">
              <thead className="bg-[#990000] text-white">
                <tr>
                  <th className="border border-gray-300 p-3">ID Curso</th>
                  <th className="border border-gray-300 p-3">Nombre del Curso</th>
                  <th className="border border-gray-300 p-3">Fecha Registro</th>
                  <th className="border border-gray-300 p-3">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(groupedInscripciones).map(([cursoId, inscripciones], index) => {
                  const curso = inscripciones[0];
                  return (
                    <React.Fragment key={cursoId}>
                      <tr className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"} text-center transition`}>
                        <td className="border border-gray-300 p-3">{cursoId}</td>
                        <td className="border border-gray-300 p-3">{curso.NombreCurso || curso.Cursos?.NombreCurso || curso.curso?.NombreCurso || "Desconocido"}</td>
                        <td className="border border-gray-300 p-3">{new Date(curso.fecreg).toLocaleDateString()}</td>
                        <td className="border border-gray-300 p-3 flex justify-center gap-3">
                          
                          <button
                            onClick={() => toggleExpand(Number(cursoId))}
                            className="bg-[#990000] text-white px-3 py-1 rounded-md hover:bg-red-700 transition"
                          >
                            {expandedCourses[Number(cursoId)] ? "Ver menos" : "Ver más"}
                          </button>

                          <button
                          onClick={() => handleDownloadExcelByCurso (Number(cursoId))}
                          className="flex items-center gap-2 bg-green-600 text-white px-1 py-1 rounded-md hover:bg-green-700 transition">
                            <ArrowDownTrayIcon className="w-5 h-5"/>
                            Descargar
                          </button>
                        </td>
                      </tr>

                      {expandedCourses[Number(cursoId)] && (
                        <tr>
                          <td colSpan={4}>
                            <div className="p-4 bg-gray-50 border border-gray-300 rounded-md shadow-md mt-2">
                              <h3 className="text-lg font-semibold text-[#990000]">Inscritos:</h3>
                              
                              <table className="w-full border-collapse border border-gray-500">
                                <thead className="bg-[#990000] text-white">
                                  <tr >
                                    <th className="border border-gray-300 p-2">Nombre del inscrito</th>
                                    <th className="border border-gray-300 p-2">Numero de documento</th>
                                    <th className="border border-gray-300 p-2">Fecha de inscripción</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {inscripciones
                                  .filter((inscripciones) => Number(inscripciones.est) ===1)
                                  .map((inscripciones) => (
                                    <tr key={inscripciones.id} className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"} text-center transition`}>
                                      <td className="border border-gray-300 p-1">{inscripciones.nombre}</td>
                                      <td className="border border-gray-300 p-1 ">{inscripciones.docInscr}</td>
                                      <td className="border border-gray-300 p-1">{inscripciones.fecreg}</td>
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
      </div>
    </div>
  );
}
