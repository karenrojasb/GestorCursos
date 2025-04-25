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
}

interface InscripcionesModalProps {
  onClose: () => void;
}

interface Nota {
  id: number;
  idCurso: number;
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
  const [inscritoSeleccionado, setInscritoSeleccionado] = useState<{ nombre: string, doc: string } | null>(null);
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

  useEffect(() => {
    async function fetchNotas() {
      try {
        const response = await fetch("http://localhost:8090/api/Notas");
        if (!response.ok) throw new Error("Error al obtener las Notas");

        const data = await response.json();
        console.log("Notas recibidas:", data);
        setNota(data);
      } catch (error) {
        console.error("Error cargando lista de Notas:", error);
      }
    }
    fetchNotas();
  }, []);

  const abrirModalCalificar = async (nombre: string, doc: string) => {
    setInscritoSeleccionado({ nombre, doc });
    setModalCalificarAbierto(true);

    try {
      const response = await fetch(`http://localhost:8090/api/Notas/${doc}`);
      if (!response.ok) throw new Error("Error al obtener notas");

      const notasData: Nota[] = await response.json();

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

  const groupedInscripciones = inscripcionesFiltradas.reduce((acc, inscripcion) => {
    const cursoId = inscripcion.idCur || inscripcion.Cursos?.id || inscripcion.curso?.id || 0;
    if (!acc[cursoId]) {
      acc[cursoId] = [];
    }
    acc[cursoId].push(inscripcion);
    return acc;
  }, {} as { [key: number]: Inscripcion[] });

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
    const datosCurso = inscripcionesFiltradas.filter(
      (inscripcion) => (inscripcion.idCur || inscripcion.Cursos?.id || inscripcion.curso?.id) === cursoId
    );

    if (datosCurso.length === 0) {
      alert("No hay inscripciones en este curso.");
      return;
    }

    const data = datosCurso.map((inscripcion) => ({
      "ID Curso": inscripcion.idCur || inscripcion.Cursos?.id || inscripcion.curso?.id,
      "Nombre del Curso": inscripcion.NombreCurso || "Desconocido",
      "Documento": inscripcion.docInscr,
      "Nombre": inscripcion.nombre,
      "Estado": inscripcion.est === 1 ? "Inscrito" : "Cancelado",
      "Fecha Registro": new Date(inscripcion.fecreg).toLocaleDateString(),
    }));

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Inscripciones");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    saveAs(blob, `Inscripciones_Curso_${cursoId}.xlsx`);
  };

  return (
    <div className="p-6">
      <div className="overflow-x-auto max-h-[400px] scroll-y">
        <div className="relative z-0 w-full">
          <div className="flex justify-between mb-2">
            <div className="p-1">
              <label className="text-xs" htmlFor="search">
                Buscar por curso o inscrito
              </label>
              <input
                className="input-text"
                type="text"
                id="search"
                placeholder="Buscar..."
                value={busqueda}
                onChange={handleBuscar}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              />
            </div>
          </div>

          {isLoading ? (
            <div>Cargando...</div>
          ) : (
            <>
              {Object.keys(groupedInscripciones).map((cursoId) => {
                const cursoInscripciones = groupedInscripciones[Number(cursoId)];
                return (
                  <div key={cursoId} className="border-b py-2">
                    <div
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => toggleExpand(Number(cursoId))}
                    >
                      <h2>{cursoInscripciones[0]?.NombreCurso}</h2>
                      <ArrowDownTrayIcon className="w-5 h-5" />
                    </div>
                    {expandedCourses[Number(cursoId)] && (
                      <div className="pl-5">
                        <ul>
                          {cursoInscripciones.map((inscripcion) => (
                            <li key={inscripcion.id}>
                              {inscripcion.nombre}
                              <button
                                onClick={() => abrirModalCalificar(inscripcion.nombre, inscripcion.docInscr)}
                                className="text-blue-500"
                              >
                                Calificar
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <button
                      className="bg-blue-500 text-white p-1 rounded"
                      onClick={() => handleDownloadExcelByCurso(Number(cursoId))}
                    >
                      Descargar Inscripciones
                    </button>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
}