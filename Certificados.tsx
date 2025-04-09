
"use client";

import { useEffect, useState } from "react";
import { DocumentArrowDownIcon, XMarkIcon, UserIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";

interface NotaCurso {
  idCurso: number;
  NombreCurso: string;
  Lugar: string;
  Inicio: string;
  Fin: string;
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
  ProExterno: string;
  ProfesorNombre: string;
  SegundoProNombre: string;
}

export default function Certificados({ onClose }: { onClose: () => void }) {
  const [notas, setNotas] = useState<NotaCurso[]>([]);
  const [loading, setLoading] = useState(true);
 const [cursosFiltrados, setCursosFiltrados] = useState<NotaCurso[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);

  useEffect(() => {
    const idEmp = localStorage.getItem("id_emp");
    if (idEmp) {
      fetchNotas(parseInt(idEmp));
    }
  }, []);

  const fetchNotas = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:8090/api/notas/${id}`);
      const data = await res.json();
      setNotas(data);
    } catch (error) {
      console.error("Error al obtener certificados:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatearHorario = (curso: NotaCurso) => {
    const dias = [
      { dia: "Lunes", ini: curso.LunesIni, fin: curso.LunesFin },
      { dia: "Martes", ini: curso.MartesIni, fin: curso.MartesFin },
      { dia: "Miércoles", ini: curso.MiercolesIni, fin: curso.MiercolesFin },
      { dia: "Jueves", ini: curso.JuevesIni, fin: curso.JuevesFin },
      { dia: "Viernes", ini: curso.ViernesIni, fin: curso.ViernesFin },
      { dia: "Sábado", ini: curso.SabadoIni, fin: curso.SabadoFin },
    ];
    return dias.filter((d) => d.ini && d.fin);
  };

  
  const handleBuscar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const texto = e.target.value.toLowerCase();
    setBusqueda(texto);
    setIsSearchActive(texto !== "");
  
    const resultadosFiltrados = notas.filter((nota) =>
      nota.NombreCurso.toLowerCase().includes(texto)
    );
    setCursosFiltrados(resultadosFiltrados);
  };

  const handleMouseEnter = () => {
    setIsSearchActive(true);
  };

  const handleMouseLeave = () => {
    if (busqueda === "") {
      setIsSearchActive(true);
    }
  };


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 shadow-md max-w-6xl w-full h-[90vh] overflow-hidden flex flex-col">
        <div className="flex justify-between items-center mb-4">
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
              className={`px-4 py-2 border rounded-full transition-all duration-500 ease-in-out 
                ${isSearchActive ? "w-96 opacity-100 bg-white shadow-md" : "w-0 opacity-0"} focus:outline-none`}
            />     

         
        </div>
        <button onClick={onClose} className="text-gray-500 hover:text-[#990000]">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        <h2 className="text-2xl justify-center text-center font-bold text-[#990000]">Certificados de Cursos</h2>
          

        <div className="overflow-y-auto flex-1">
          {loading ? (
            <div className="text-center py-8">Cargando certificados...</div>
          ) : notas.length > 0 ? (
            <table className="w-full text-sm border border-gray-300">
              <thead className="bg-[#990000] text-white">
                <tr>
                  <th className="p-2 border">Curso</th>
                  <th className="p-2 border">Profesor</th>
                  <th className="p-2 border">Horario</th>
                  <th className="p-2 border">Lugar</th>
                  <th className="p-2 border">Inicio</th>
                  <th className="p-2 border">Fin</th>
                  <th className="p-2 border">Certificado</th>
                </tr>
              </thead>
              <tbody>
                {notas.map((curso, index) => (
                  <tr key={index} className="text-center border-t">
                    <td className="p-2 border text-left font-semibold">{curso.NombreCurso}</td>
                    <td className="p-2 border text-left">
                      {[curso.ProfesorNombre, curso.SegundoProNombre, curso.ProExterno]
                        .filter((p) => p && p.trim() !== "")
                        .map((p, idx) => (
                          <div key={idx} className="flex items-center gap-1 text-xs">
                            <UserIcon className="h-4 w-4 text-[#990000]" />
                            {p}
                          </div>
                        ))}
                    </td>
                    <td className="p-2 border text-left">
                      {formatearHorario(curso).map((h, i) => (
                        <div key={i}>
                          <strong>{h.dia}</strong>: {h.ini} - {h.fin}
                        </div>
                      ))}
                    </td>
                    <td className="p-2 border">{curso.Lugar}</td>
                    <td className="p-2 border">{curso.Inicio || "N/A"}</td>
                    <td className="p-2 border">{curso.Fin || "N/A"}</td>
                    <td className="p-2 border">
                      <button className="text-[#990000] hover:scale-110 transition">
                        <DocumentArrowDownIcon className="h-6 w-6 mx-auto" />
                        <span className="text-xs">Descargar</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-8">No se encontraron certificados.</div>
          )}
        </div>
      </div>
    </div>
  );
}
