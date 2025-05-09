import React, { useState, useEffect } from "react";
import {
  XMarkIcon,
  MagnifyingGlassIcon,
  ArrowDownTrayIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/solid";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

interface Inscripcion {
  NombreCurso: string;
  id: number;
  idCur?: number;
  docInscr: string;
  nombre: string;
  Est: string;
  fecreg: string;
  Nota: number;
  Especificacion: string;
  Inicio: string;
  Fin: string;
  Horas: number;
  Lugar: string;
  Linea: string;
  Valor: number;
  Modalidad: string;
  NombreProfesor: string;
  SegundoProfe: string;
  Proexterno: string;
  IdTipoCurso: string;
  Descripcion: string;
  Unidad: string;
  Publico: string;
  Periodo: string;
  CupoMax: number;
  idRegistro: number;
  FechaRegistro: number;
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


interface ReportesModalProps {
  onClose: () => void;
}

const ReportesModal: React.FC<ReportesModalProps> = ({ onClose }) => {
  const [inscripciones, setInscripciones] = useState<Inscripcion[]>([]);
  const [inscripcionesFiltradas, setInscripcionesFiltradas] = useState<Inscripcion[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [expandedCursos, setExpandedCursos] = useState<{ [key: number]: boolean }>({});
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [modalCalificarAbierto, setModalCalificarAbierto] = useState(false);
  const [inscritoSeleccionado, setInscritoSeleccionado] = useState<{nombre: string, doc:string} | null>(null);

  useEffect(() => {
    const fetchInscripciones = async () => {
      try {
        const idProfesor = localStorage.getItem("id_emp");
        if (!idProfesor) return;
  
        const response = await fetch(`http://localhost:8090/api/inscripciones/cursos/${idProfesor}`);
        let data: Inscripcion[] = await response.json();
  
        // Eliminar duplicados usando combinación de docInscr + idCur como clave única
        const seen = new Set<string>();
        const dataSinDuplicados = data.filter((item) => {
          const key = `${item.docInscr}-${item.idCur}`;
          if (seen.has(key)) return false;
          seen.add(key);
          return true;
        });
  
        setInscripciones(dataSinDuplicados);
        setInscripcionesFiltradas(dataSinDuplicados);
        setIsLoading(false);
      } catch (error) {
        console.error("Error al obtener inscripciones:", error);
        setIsLoading(false);
      }
    };
  
    fetchInscripciones();
  }, []);

  const handleBuscar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const texto = e.target.value.toLowerCase();
    setBusqueda(texto);

    const filtrados = inscripciones.filter((inscripcion) => {
      const cursoNombre = inscripcion.NombreCurso || "";
      const fechaRegistro = new Date(inscripcion.fecreg).toLocaleDateString();
      const idCurso = String(inscripcion.idCur || "");
      const nombreInscrito = inscripcion.nombre.toLowerCase();
      const docInscrito = inscripcion.docInscr;

      return (
        idCurso.includes(texto) ||
        cursoNombre.toLowerCase().includes(texto) ||
        fechaRegistro.includes(texto) ||
        nombreInscrito.includes(texto) ||
        docInscrito.includes(texto)
      );
    });

    setInscripcionesFiltradas(filtrados);
  };

  const groupedInscripciones = inscripcionesFiltradas.reduce((acc, inscripcion) => {
    const cursoId = inscripcion.idCur || 0;
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



  const handleMouseEnter = () => {
    setIsSearchActive(true);
  };

  const handleMouseLeave = () => {
    if (busqueda === "") {
      setIsSearchActive(true);
    }
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

  const formatearHorario = (Inscripciones: Inscripcion) => {
    const dias = [
      { dia: "Lunes", ini: Inscripciones.LunesIni, fin: Inscripciones.LunesFin },
      { dia: "Martes", ini: Inscripciones.MartesIni, fin: Inscripciones.MartesFin },
      { dia: "Miércoles", ini: Inscripciones.MiercolesIni, fin: Inscripciones.MiercolesFin },
      { dia: "Jueves", ini: Inscripciones.JuevesIni, fin: Inscripciones.JuevesFin },
      { dia: "Viernes", ini: Inscripciones.ViernesIni, fin: Inscripciones.ViernesFin },
      { dia: "Sábado", ini: Inscripciones.SabadoIni, fin: Inscripciones.SabadoFin },
      { dia: "Domingo", ini: Inscripciones.DomingoIni, fin: Inscripciones.DomingoFin },
    ];
  
    return dias
      .filter(d => d.ini && d.fin)
     ; 
  };


  const exportarCursoAExcel = (cursoId: number) => {
    const cursoInscripciones = groupedInscripciones[cursoId];
    if (!cursoInscripciones || cursoInscripciones.length === 0) return;
  
    // Curso base
    const cursoInfo = cursoInscripciones[0];
  
    // Información general del curso
    const datosCurso = [{
      ID: cursoInfo.idCur,
      Nombre: cursoInfo.NombreCurso,
      Valor: cursoInfo.Valor,
      Público: cursoInfo.Publico,
      Periodo: cursoInfo.Periodo,
      Cupo_Máximo: cursoInfo.CupoMax,
      Lugar: cursoInfo.Lugar,
      Inicio: cursoInfo.Inicio,
      Fin: cursoInfo.Fin,
      Horas: cursoInfo.Horas,
      Modalidad: cursoInfo.Modalidad,
      Unidad: cursoInfo.Unidad,
      Tipo_Curso: cursoInfo.IdTipoCurso,
      Profesor: cursoInfo.NombreProfesor,
      Segundo_Profesor: cursoInfo.SegundoProfe,
      Profe_Externo: cursoInfo.Proexterno,
      Descripcion: cursoInfo.Descripcion,
    }];
  
    // Inscritos
    const inscritos = cursoInscripciones.map((ins) => ({
      Documento: ins.docInscr,
      Nombre: ins.nombre,
      Estado: ins.Est,
      Nota: ins.Especificacion,
      FechaInscripción: ins.fecreg,
      
    }));
  
    const wb = XLSX.utils.book_new();
    const wsCurso = XLSX.utils.json_to_sheet(datosCurso);
    const wsInscritos = XLSX.utils.json_to_sheet(inscritos);
  
    XLSX.utils.book_append_sheet(wb, wsCurso, "Curso");
    XLSX.utils.book_append_sheet(wb, wsInscritos, "Inscritos");
  
    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([wbout], { type: "application/octet-stream" }), `Curso_${cursoId}.xlsx`);
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
                     placeholder="Buscar por ID, Nombre o Fecha"
                     value={busqueda}
                     onChange={handleBuscar}
                     className={`px-4 py-2 border rounded-full transition-all duration-500 ease-in-out 
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
    


 <div key={cursoId} className="border border-gray-300 rounded shadow-md  transition-all duration-300 hover:shadow-xl transform hover:scale-x-105">
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
             onClick={() => exportarCursoAExcel(Number(cursoId))}
            className="flex items-center bg-green-600 text-white px-3 py-1.5 rounded-md hover:bg-green-700 transition"
          >
            <ArrowDownTrayIcon className="h-5 w-5 mr-1" />
            Descargar
          </button>
          <button
            onClick={() => toggleCurso(Number(cursoId))}
            className="flex items-center bg-[#990000] text-white px-3 py-1.5 rounded-md hover:bg-[#7a0000] transition"
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
             <div className="p-4 space-y-3">
               {/* Detalles del curso */}
               <table className="w-full border  text-xs">
               <thead className="bg-[#990000] text-white">
          <tr>
            <th colSpan={6} className="text-center py-1  font-semibold border-b border-gray-300 text-base">
              Datos del Curso
            </th>
          </tr>
        </thead >
                 <tbody className="">
                 <tr className="bg-gray-100  text-[#990000] font-medium">
                <th className="px-3 py-1 border ">ID</th>
                <th className="px-3 py-1 border">Nombre</th>
                <th className="px-3 py-1 border">Valor</th>
                <th className="px-3 py-1 border">Público</th>
                <th className="px-3 py-1 border">Periodo</th>
                <th className="px-3 py-1 border">Cupo Máx</th>
                   </tr>
                   <tr className="text-gray-700 text-center">
                     <td className="border px-2 py-1">{inscripciones[0]?.id}</td>
                     <td className="border px-2 py-1">{inscripciones[0]?.NombreCurso}</td>
                     <td className="border px-2 py-1">{inscripciones[0]?.Valor}</td>
                     <td className="border px-2 py-1">{inscripciones[0]?.Publico}</td>
                     <td className="border px-2 py-1">{inscripciones[0]?.Periodo}</td>
                     <td className="border px-2 py-1">{inscripciones[0]?.CupoMax}</td>
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
                   <td className="border px-2 py-1">{inscripciones[0]?.Inicio}</td>
                   <td className="border px-2 py-1">{inscripciones[0]?.Fin}</td>
                     <td className="border px-2 py-1">{inscripciones[0]?.Horas}</td>
                     <td className="px-3 py-1 border text-left">
                  {formatearHorario(inscripciones[0]).map((h, i) => (
                    <div key={i}>
                      <strong>{h.dia}</strong> {h.ini} - {h.fin}
                    </div>
                  ))}
                </td>
                     <td className="border px-2 py-1">{inscripciones[0]?.Lugar}</td>
                     <td className="border px-2 py-1">{inscripciones[0]?.Linea}</td>
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
                     <td className="border px-2 py-1">{inscripciones[0]?.Est}</td>
                     <td className="border px-2 py-1">{inscripciones[0]?.Modalidad}</td>
                     <td className="border px-2 py-1">{inscripciones[0]?.NombreProfesor}</td>
                     <td className="border px-2 py-1">{inscripciones[0]?.SegundoProfe}</td>
                     <td className="border px-2 py-1">{inscripciones[0]?.Proexterno}</td>
                     <td className="border px-2 py-1">{inscripciones[0]?.Unidad}</td>
                   </tr>
                   <tr className="bg-gray-100 text-[#990000] font-medium">
                <th className="px-3 py-1 border">Tipo</th>
                <th className="px-3 py-1 border" colSpan={5}>Descripción</th>
              </tr>
              <tr className="text-gray-700 text-center">
                <td className="px-3 py-1 border">{inscripciones[0]?.IdTipoCurso}</td>
                <td className="px-3 py-1 border text-left" colSpan={5}>{inscripciones[0]?.Est || 'Sin Descripción'}</td>
              </tr>
                 </tbody>
               </table>
           
               {/* Lista de inscritos */}
              
               <div className="overflow-x-auto">
                
                 <table className="min-w-full border text-xs mt-3">
                  
                   <thead className="bg-[#990000] text-white">

                   <tr>
            <th colSpan={6} className="text-center py-1 text-base font-semibold border-b border-gray-300">
              Inscritos
            </th>
          </tr>
                     
                   </thead>
                   <tbody>
                   <tr className="bg-gray-100 text-[#990000] font-medium">
                       <th className="border px-3 py-1">Documento</th>
                       <th className="border px-3 py-1">Nombre</th>
                       <th className="border px-3 py-1">Fecha de Registro</th>
                       <th className="border px-3 py-1">Calificador</th>
                       <th className="border px-3 py-1">Fecha de Calificación</th>
                       <th className="border px-3 py-1">Nota</th>
                       
                     </tr>
                  
                     {inscripciones.map((inscrito) => (
                       <tr key={inscrito.docInscr}>
                         <td className="border px-3 py-1">{inscrito.docInscr}</td>
                         <td className="border px-3 py-1">{inscrito.nombre}</td>
                         <td className="border px-3 py-1">{new Date(inscrito.fecreg).toLocaleDateString()}</td> 
                         <td className="border px-3 py-1">{inscrito.FechaRegistro ?? "-"}</td>
                         <td className="border px-3 py-1">{inscrito.idRegistro ?? "-"}</td>
                         <td className="border px-3 py-1">
                          {inscrito.Especificacion ?? "Sin Nota"}
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

export default ReportesModal;
