"use client";
import { TrashIcon, XMarkIcon, MagnifyingGlassIcon, PencilSquareIcon, ArrowDownTrayIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import CursoEditarModal from "../components/CursoEditarModal"
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
  LineaNombre: number;
  Estado: string;
  EstadoNombre: string;
  Modalidad: number;
  ModalidadNombre: string;
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
  SegundoProNombre: string;
  TipoCursoNombre: string;
  

  

}

interface Inscritos {
  id: number;
  idCur: number;
  docInscr: number;
  fecreg: string;
  notaId: number;
  nota: number;
  idRegistro: number;
  fechaRegistro: string;
  especificacion: string;
  nombreInscrito: string;
  nombreRegistrador: string;
}

interface OpcionLista {
  id: number;
  Especificacion: string;
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
  const [opciones, setOpciones] = useState<OpcionLista[]>([]);
  const [guardando, setGuardando] = useState(false);  
  const [inscripciones, setInscripciones] = useState<{ [key: number]: Inscritos[] }>({});
  const [ year, setYear] = useState<number[]>([]);
  const [yearSeleccionado, setYearSeleccionado]  = useState<number | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
    

  // OBTENER CURSO DE BACKEND
const fetchCursos = async () => {
  setIsLoading(true);
  try {
    const response = await fetch("http://localhost:8090/api/cursos");
    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
    const data = await response.json();
    setCursos(data);

    // Obtener el año actual
    const añoActual = new Date().getFullYear();

    // Filtrar cursos por el año actual (usando campo Fin)
    const cursosDelAñoActual = data.filter((curso: Curso) =>
      new Date(curso.Fin).getFullYear() === añoActual
    );
    setYearSeleccionado(añoActual);
    setCursosFiltrados(cursosDelAñoActual);

    // Extraer años únicos desde el campo Fin
    const añosUnicos = Array.from(
      new Set(data.map((curso: Curso) => new Date(curso.Fin).getFullYear()))
    ) as number[];
    añosUnicos.sort((a, b) => b - a);
    setYear(añosUnicos);

    // Seleccionar el año actual en el filtro (si usas uno)
    setSelectedYear(añoActual); // <--- Asegúrate de tener este estado

    // Obtener opciones de listas
    const respOpciones = await fetch("http://localhost:8090/api/listas/Especificaciones");
    if (!respOpciones.ok) throw new Error("Error al obtener lista de especificaciones");
    const dataOpciones = await respOpciones.json();
    setOpciones(dataOpciones);

  } catch (error) {
    console.error("Error al obtener los cursos o especificaciones:", error);
  } finally {
    setIsLoading(false);
  }
};
useEffect(() => {
  fetchCursos();
}, []);

const handleUpdate = () => {
  fetchCursos();
};




const fetchInscripcionesCurso = async (idCurso: number) => {
  try {
    const response = await fetch(`http://localhost:8090/api/inscripciones/curso/${idCurso}`);
    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
    const data = await response.json();
    setInscripciones(prev => ({ ...prev, [idCurso]: data }));
  } catch (error) {
    console.error(`Error al obtener inscripciones del curso ${idCurso}:`, error);
  }
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

const handleVerMas = async (id: number) => {
  if (expandedCursoId === id) {
    setExpandedCursoId(null);
  } else {
    setExpandedCursoId(id);
    if (!inscripciones[id]) {
      await fetchInscripcionesCurso(id); 
    }
  }
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



const handleChangeEspecificacion = async (
  idInscripcion: number,
  idEspecificacion: number
) => {
 
  let inscripcion: Inscritos | undefined;
  let cursoIdEncontrado: number | null = null;

  for (const cursoId in inscripciones) {
    const listaInscripciones = inscripciones[Number(cursoId)];
    const encontrada = listaInscripciones.find((i) => i.id === idInscripcion);
    if (encontrada) {
      inscripcion = encontrada;
      cursoIdEncontrado = Number(cursoId);
      break;
    }
  }

  if (!inscripcion || cursoIdEncontrado === null) return;

  try {
    setGuardando(true);

    const especificacionObj = opciones.find((op) => op.id === idEspecificacion);
    if (!especificacionObj) {
      alert("Especificación no encontrada.");
      setGuardando(false);
      return;
    }

    const descripcion = especificacionObj.Especificacion;

    const idEmpString = localStorage.getItem("id_emp");
    if (!idEmpString) {
      alert("No se encontró el id_emp en localStorage");
      setGuardando(false);
      return;
    }
    const idEmp = Number(idEmpString);

    const notaData = {
      idCurso: inscripcion.idCur,
      idInscrito: inscripcion.docInscr,
      idRegistro: idEmp,
      Nota: idEspecificacion,
      FechaRegistro: new Date(),
    };

    let response;
    if (inscripcion.notaId) {
      response = await fetch(`http://localhost:8090/api/notas/${inscripcion.notaId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(notaData),
      });
    } else {
      response = await fetch("http://localhost:8090/api/notas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(notaData),
      });
    }

    if (!response.ok) throw new Error("Error al guardar la nota");

    const nuevoIdNota = !inscripcion.notaId ? (await response.json()).id : inscripcion.notaId;

    // Actualizar el estado correctamente
    setInscripciones((prev) => ({
      ...prev,
      [cursoIdEncontrado!]: prev[cursoIdEncontrado!].map((i) =>
        i.id === idInscripcion
          ? { ...i, especificacion: descripcion, notaId: nuevoIdNota }
          : i
      ),
    }));

  } catch (error) {
    console.error("Error al guardar nota:", error);
    alert("Hubo un error al guardar la nota.");
  } finally {
    setGuardando(false);
  }
};






async function exportarCursoAExcel(curso: Curso) {
  const response = await fetch(`http://localhost:8090/api/inscripciones/curso/${curso.id}`);
  if (!response.ok) {
    alert("Error al obtener inscritos para exportar.");
    return;
  }
  const inscritosCurso = await response.json();

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
      Estado: curso.EstadoNombre,
      Línea: curso.LineaNombre,
      Modalidad: curso.ModalidadNombre,
      Unidad: curso.Unidad,
      Profesor: curso.NombreProfesor,
      SegundoProfesor: curso.SegundoProNombre,
      ProfesorExterno: curso.Proexterno,
      TipoCurso: curso.TipoCursoNombre,
      InicioInscripción: curso.InicioInscr,
      FinInscripción: curso.FinInscr,
      Descripción: curso.Descripcion,
    },
  ];
  const hojaCurso = XLSX.utils.json_to_sheet(datosCurso);

  const datosInscritos = inscritosCurso.map((inscrito: Inscritos) => ({
    Documento: inscrito.docInscr,
    Nombre: inscrito.nombreInscrito,
    FechaInscripción: inscrito.fecreg,
    Nota: inscrito.nota,
    DocumentoCalificador: inscrito.idRegistro,
    CalificadoPor: inscrito.nombreRegistrador,
    FechaRegistro: inscrito.fechaRegistro,
  }));
  const hojaInscritos = XLSX.utils.json_to_sheet(datosInscritos);

  const libro = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(libro, hojaCurso, "Datos del Curso");
  XLSX.utils.book_append_sheet(libro, hojaInscritos, "Inscritos y Notas");

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
   <div className="bg-white rounded-lg p-6 shadow-md max-w-6xl w-full h-[90vh] overflow-hidden flex flex-col relative">
  
          
          <button
    onClick={onClose}
    className="absolute top-4 right-4 text-gray-500 hover:text-[#990000] transition-transform duration-300 transform hover:rotate-90 hover:scale-110"
  >
    <XMarkIcon className="h-6 w-6" />
  </button>

          {/* DESPLEGABLE DE AÑOS */}
 
<div className="flex flex-col gap-1 w-52 mb-4">
  <span className="text-sm font-semibold text-gray-600">Año</span>
  <select
    value={yearSeleccionado ?? ""}
    onChange={(e) => {
      const valor = e.target.value;
      const año = parseInt(valor);
      setYearSeleccionado(año);

      const cursosFiltradosPorAño = cursos.filter(
        (curso) => new Date(curso.Fin).getFullYear() === año
      );
      setCursosFiltrados(cursosFiltradosPorAño);
    }}
    className="bg-white border border-gray-300 rounded-md px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
  >
    {year.map((año) => (
      <option key={año} value={año}>
        {año}
      </option>
    ))}
  </select>
</div>
     
  

        {/* BARRA DE BUSQUEDA */}
        <div className="flex justify-between items-center mb-2">
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
            cursosFiltrados.map((curso, index) => (
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
      
                     title="Descargar">                    
                
            <ArrowDownTrayIcon className="font-semibold h-5 w-5"/>
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
          <td className="px-3 py-1 border">{curso.LineaNombre}</td>
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
          <td className="px-3 py-1 border">{curso.EstadoNombre}</td>
          <td className="px-3 py-1 border">{curso.ModalidadNombre}</td>
          <td className="px-3 py-1 border">{curso.NombreProfesor}</td>
          <td className="px-3 py-1 border">{curso.SegundoProNombre}</td>
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
          <td className="px-3 py-1 border">{curso.TipoCursoNombre}</td>
          <td className="px-3 py-1 border">{curso.InicioInscr }</td>
          <td className="px-3 py-1 border">{curso.FinInscr}</td>
          <td className="px-3 py-1 border text-left" colSpan={3}>{curso.Descripcion}</td>
        </tr>
      
    </tbody>

          
                    
  </table>
 
 
</div> 
 



<table className="w-full text-sm text-left border border-gray-300 mt-4">
  <thead className="bg-[#990000] text-white ">
    <tr>
      <th className="p-2 border-b">Documento</th>
      <th className="p-2 border-b">Nombre</th>
      <th className="p-2 border-b">Fecha Inscripción</th>    
      
      <th className="p-2 border-b">Calificador</th>
      <th className="p-2 border-b">Fecha Calificación</th>
      <th className="p-2 border-b">Nota</th>
    </tr>
  </thead>
  <tbody>
    {inscripciones[curso.id]?.map((inscrito) => (
      <tr key={inscrito.id} className="border-t hover:bg-gray-200 bg-white">
        <td className="p-2">{inscrito.docInscr}</td>
        <td className="p-2">{inscrito.nombreInscrito}</td>
        <td className="p-2">{new Date(inscrito.fecreg).toLocaleDateString()}</td>       
    
      
        <td className="p-2">{inscrito.nombreRegistrador}</td>
        <td className="p-2">{inscrito.fechaRegistro ? new Date(inscrito.fechaRegistro).toLocaleDateString() : <span className="text-gray-500">-</span>}</td>
     <td>   <select
  className="border rounded px-2 py-1 text-sm bg-white"
  value={
    
    opciones.find(op => op.Especificacion === inscrito.especificacion)?.id || ""
  }
  onChange={(e) => handleChangeEspecificacion(inscrito.id, Number(e.target.value))}
>
  <option value="">-- Selecciona --</option>
  {opciones.map((opcion) => (
    <option key={opcion.id} value={opcion.id}>
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
