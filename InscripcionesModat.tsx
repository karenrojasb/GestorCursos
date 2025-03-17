import { useState, useEffect } from "react";
import { XMarkIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import React from "react";

interface Curso {
  id: number;
  NombreCurso: string;
}

interface Inscripcion {
  id: number;
  idCur?: number;
  Cursos?: Curso;
  cursos?: Curso;
  docInscr: string;
  est: number;
  fecreg: string;
}

interface InscripcionesModalProps {
  onClose: () => void;
}

export default function InscripcionesModal({ onClose }: InscripcionesModalProps) {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [inscripciones, setInscripciones] = useState<Inscripcion[]>([]);
  const [expandedCourses, setExpandedCourses] = useState<{ [key: number]: boolean }>({});
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    const fetchCursosEInscripciones = async () => {
      try {
        // Obtener todos los cursos
        const responseCursos = await fetch("http://localhost:8090/api/cursos");
        if (!responseCursos.ok) throw new Error("Error al obtener cursos");
        const cursosData: Curso[] = await responseCursos.json();
        setCursos(cursosData);

        // Obtener inscripciones activas (est = 1)
        const responseInscripciones = await fetch("http://localhost:8090/api/inscripciones");
        if (!responseInscripciones.ok) throw new Error("Error al obtener inscripciones");
        const inscripcionesData: Inscripcion[] = await responseInscripciones.json();
        const inscripcionesActivas = inscripcionesData.filter((ins) => ins.est === 1);

        setInscripciones(inscripcionesActivas);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    fetchCursosEInscripciones();
  }, []);

  // Filtrar inscripciones en tiempo real
  const handleBuscar = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBusqueda(e.target.value.toLowerCase());
  };

  // Agrupar inscripciones activas por curso
  const groupedInscripciones = cursos.map((curso) => {
    return {
      curso,
      inscripciones: inscripciones.filter((ins) => ins.idCur === curso.id),
    };
  });

  // Alternar expansión de curso
  const toggleExpand = (cursoId: number) => {
    setExpandedCourses((prev) => ({ ...prev, [cursoId]: !prev[cursoId] }));
  };

  return (
    <div className="p-6 rounded-lg shadow-lg fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative flex flex-col items-center gap-4 w-full max-w-4xl bg-white py-8 px-10 rounded-lg shadow-md min-h-[800px]">
        
        {/* BOTÓN CERRAR */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-[#990000] transition-transform duration-300 transform hover:rotate-90 hover:scale-110"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        {/* TÍTULO */}
        <h2 className="text-3xl font-bold text-[#990000] text-center">Lista de Inscripciones</h2>

        {/* BARRA DE BÚSQUEDA */}
        <div className="relative w-full flex items-center mb-4 transition-all duration-300">
          <MagnifyingGlassIcon className="absolute left-3 h-5 w-5 text-gray-500" />
          <input
            type="text"
            placeholder="Buscar por Nombre o Documento"
            value={busqueda}
            onChange={handleBuscar}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#990000] focus:border-[#990000] transition-all duration-300"
          />
        </div>

        {/* LISTA DE INSCRIPCIONES */}
        <div className="w-full max-h-[600px] overflow-auto border border-gray-300 rounded-md shadow-sm">
          {groupedInscripciones.length > 0 ? (
            <table className="w-full border-collapse border border-gray-300">
              <thead className="bg-[#990000] text-white">
                <tr>
                  <th className="border border-gray-300 p-3">ID Curso</th>
                  <th className="border border-gray-300 p-3">Nombre del Curso</th>
                  <th className="border border-gray-300 p-3">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {groupedInscripciones.map(({ curso, inscripciones }, index) => (
                  <React.Fragment key={curso.id}>
                    <tr className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"} text-center`}>
                      <td className="border border-gray-300 p-3">{curso.id}</td>
                      <td className="border border-gray-300 p-3">{curso.NombreCurso}</td>
                      <td className="border border-gray-300 p-3">
                        <button
                          onClick={() => toggleExpand(curso.id)}
                          className="bg-[#990000] text-white px-4 py-1 rounded-md hover:bg-red-700 transition"
                        >
                          {expandedCourses[curso.id] ? "Ver menos" : "Ver más"}
                        </button>
                      </td>
                    </tr>

                    {expandedCourses[curso.id] && (
                      <tr>
                        <td colSpan={3}>
                          <div className="p-4 bg-gray-50 border border-gray-300 rounded-md shadow-md mt-2">
                            <h3 className="text-lg font-semibold text-[#990000]">Inscritos:</h3>
                            {inscripciones.length > 0 ? (
                              <ul className="list-disc pl-5 mt-2 space-y-2">
                                {inscripciones.map((inscripcion) => (
                                  <li key={inscripcion.id} className="text-gray-700">
                                    <strong>Documento:</strong> {inscripcion.docInscr} |
                                    <strong> Fecha:</strong> {new Date(inscripcion.fecreg).toLocaleDateString()}
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p className="text-gray-500">No hay inscripciones activas en este curso.</p>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-4 text-gray-500">No hay cursos disponibles.</div>
          )}
        </div>
      </div>
    </div>
  );
}