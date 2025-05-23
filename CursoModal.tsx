import { useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

interface CursoModalProps {
  onClose: () => void;
  onSave: (data: any) => void;
}

interface Opcion {
  id: number;
  Especificacion: string;
  Tipo: number;
}

export default function CursoModal({ onClose, onSave }: CursoModalProps) {
  const [curso, setCurso] = useState({
    NombreCurso: "",
    Valor: "",
    Publico: "",
    Periodo: "",
    Inicio: "",
    Fin: "",
    Horas: "",
    CupoMax: "",
    Lugar: "",
    Linea: "",
    Estado: "",
    Modalidad: "",
    Unidad: "",
    Profesor: "",
    SegundoPro: "",  
    Proexterno: "",  
    Descripcion: "", 
    IdTipoCurso: "",
    InicioInscr: "",
    FinInscr: "",
  });
  const etiquetas = {
    NombreCurso: "Nombre Curso",
    CupoMax: "Cupo Máximo",
    SegundoPro: "Segundo Profesor",
    Proexterno: "Profesor Externo",
    IdTipoCurso: "Tipo de curso",
    Inicio: "Fecha inicio Curso",
    Fin: "Fecha fin Curso",
    InicioInscr: "Fecha de Inicio Inscripciones",
    FinInscr: "Fecha de cierre de Inscripciones",
  };

  const [opcionesPublico, setOpcionesPublico] = useState<Opcion[]>([]);
  const [opcionesLinea, setOpcionesLinea] = useState<Opcion[]>([]);
  const [opcionesModalidad, setOpcionesModalidad] = useState<Opcion[]>([]);
  const [opcionesEstado, setOpcionesEstado] = useState<Opcion[]>([]);
  const [opcionesTipoCurso, setOpcionesTipoCurso] = useState<Opcion[]>([]);
  const [profesores, setProfesores] = useState<{ id_emp: number; nombre: string}[]>([]);
  const [unidad, setUnidad] = useState<{ codigo: number; nombre: string}[]>([])
  const [opcionesPeriodos, setOpcionesPeriodos] = useState<{ periodo: string}[]>([]);


  useEffect(()  => {
    async function fetcPeriodos() {
      try {
        const response = await fetch("http://localhost:8090/api/cursos/periodos")
        if (!response.ok) throw new Error("Error al obtener los periodos");

        const data = await response.json();
        setOpcionesPeriodos(data);
        } catch(error){
          console.error("Error cargando lista de periodos:", error);
        }
      }
      fetcPeriodos(); 
  }, []);


  useEffect(()  => {
    async function fetcUnidades() {
      try {
        const response = await fetch("http://localhost:8090/api/cursos/unidad")
        if (!response.ok) throw new Error("Error al obtener las unidades");

        const data = await response.json();
        setUnidad(data);
        } catch(error){
          console.error("Error cargando lista de unidades:", error);
        }
      }
      fetcUnidades(); 
  }, []);

  useEffect(()  => {
    async function fetcProfesores() {
      try {
        const response = await fetch("http://localhost:8090/api/cursos/profesores")
        if (!response.ok) throw new Error("Error al obtener los profesores");

        const data = await response.json();
        setProfesores(data);
        } catch(error){
          console.error("Error cargando los profesores:", error);
        }
      }
      fetcProfesores(); 
  }, []);

  useEffect(() => {
    async function fetchOpciones() {
      try {
        const response = await fetch("http://localhost:8090/api/cursos/especificaciones");
        if (!response.ok) throw new Error("Error al obtener las opciones");

        const data: Opcion[] = await response.json();

        setOpcionesPublico(data.filter((item) => item.Tipo === 1));
        setOpcionesLinea(data.filter((item) => item.Tipo === 2));
        setOpcionesModalidad(data.filter((item) => item.Tipo === 3));
        setOpcionesEstado(data.filter((item) => item.Tipo === 4));
        setOpcionesTipoCurso(data.filter((item) => item.Tipo === 8));
      } catch (error) {
        console.error("Error cargando las opciones:", error);
      }
    }

    fetchOpciones();
  }, []);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {name, value} = e.target;
    setCurso((prev) => ({
      ...prev,
      [name]: value,
    }))
    }



  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const cursoData = Object.keys(curso).reduce((acc, key) => {
      const value = curso[key as keyof typeof curso];

      if (value !== "") {
       
        
const camposNumericos = ["Valor", "Horas", "CupoMax", "Publico", "Linea", "Estado", "Modalidad", "Unidad", "Profesor", "IdTipoCurso", "SegundoPro"];

if (value !== "") {
  if (camposNumericos.includes(key)) {
    const numero = Number(value);
    acc[key] = isNaN(numero) ? null : numero;
  } else {
    acc[key] = value;
  }
} else if (["SegundoPro", "Proexterno", "Descripcion"].includes(key)) {
  acc[key] = null;
}



      } else if (["SegundoPro", "Proexterno", "Descripcion"].includes(key)) {
        acc[key] = null;
      }

      return acc;
    }, {} as Record<string, any>);

    onSave(cursoData);
  };

  return (
    <div className="p-6 rounded-lg shadow-lg fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl opacity-100 animate-fade-in max-h-[80vh] overflow-y-auto">
        <motion.div
        className="relative bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl overflow-y-auto"
        initial={{ opacity: 0}}
        animate={{ opacity: 1}}
        exit={{ opacity: 0}}
        transition={{ duration: 0.3}}
        >

        {/* BOTÓN PARA CERRAR LA VENTANA */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-500 hover:text-[#990000] transition-transform duration-300 hover:rotate-90"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>

        <h2 className="text-3xl font-bold text-[#990000] text-center mb-6 seleccion-personalizada">Crear Curso</h2>
        <form onSubmit={handleSubmit} className="space-y-4 seleccion-personalizada">

{/* Nombre del curso */}
<div>
  <label>Nombre Curso</label>
  <input type="text" name="NombreCurso" value={curso.NombreCurso} onChange={handleChange} className="w-full border p-2 rounded-lg" />
</div>

{/* Valor | Público | Periodo */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  <div>
    <label>Valor</label>
    <input type="number" name="Valor" value={curso.Valor} onChange={handleChange} className="w-full border p-2 rounded-lg" />
  </div>
  <div>
    <label>Público</label>
    <select name="Publico" value={curso.Publico} onChange={handleChange} className="w-full border p-2 rounded-lg">
      <option value="">Selecciona una opción</option>
      {opcionesPublico.map((opcion) => (
        <option key={opcion.id} value={opcion.id}>{opcion.Especificacion}</option>
      ))}
    </select>
  </div>
  <div>
    <label>Periodo</label>
    <select name="Periodo" value={curso.Periodo} onChange={handleChange} className="w-full border p-2 rounded-lg">
      <option value="">Selecciona una opción</option>
      {opcionesPeriodos.map((opcion, idx) => (
        <option key={idx} value={opcion.periodo}>{opcion.periodo}</option>
      ))}
    </select>
  </div>
</div>

{/* Inicio curso | Fin curso */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <div>
    <label>Inicio curso</label>
    <input type="date" name="Inicio" value={curso.Inicio} onChange={handleChange} className="w-full border p-2 rounded-lg" />
  </div>
  <div>
    <label>Fin curso</label>
    <input type="date" name="Fin" value={curso.Fin} onChange={handleChange} className="w-full border p-2 rounded-lg" />
  </div>
</div>

{/* Horario */}
<div>
<table className="w-full border-collapse border border-gray-300 text-center">
  <thead>
    <tr className="bg-gray-200">
      <th className="border border-gray-300 px-2 py-1">Día</th>
      <th className="border border-gray-300 px-2 py-1">Hora Inicio</th>
      <th className="border border-gray-300 px-2 py-1">Hora Fin</th>
    </tr>
  </thead>
  <tbody>
    {["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"].map((dia) => (
      <tr key={dia}>
        <td className="border border-gray-300 px-2 py-1 font-semibold">{dia}</td>
        <td className="border border-gray-300 px-2 py-1">
          <input
            type="time"
            name={`${dia}Ini`}
            value={curso[`${dia}Ini` as keyof typeof curso] || ""}
            onChange={handleChange}
            className="w-full border p-1 rounded-lg focus:ring-2 focus:ring-[#990000] outline-none"
          />
        </td>
        <td className="border border-gray-300 px-2 py-1">
          <input
            type="time"
            name={`${dia}Fin`}
            value={curso[`${dia}Fin` as keyof typeof curso] || ""}
            onChange={handleChange}
            className="w-full border p-1 rounded-lg focus:ring-2 focus:ring-[#990000] outline-none"
          />
        </td>
      </tr>
      
    ))}
  </tbody>
</table>
</div>

{/* Horas | Cupo máximo */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <div>
    <label>Horas</label>
    <input type="number" name="Horas" value={curso.Horas} onChange={handleChange} className="w-full border p-2 rounded-lg" />
  </div>
  <div>
    <label>Cupo máximo</label>
    <input type="number" name="CupoMax" value={curso.CupoMax} onChange={handleChange} className="w-full border p-2 rounded-lg" />
  </div>
</div>

{/* Lugar */}
<div>
  <label>Lugar</label>
  <input type="text" name="Lugar" value={curso.Lugar} onChange={handleChange} className="w-full border p-2 rounded-lg" />
</div>

{/* Línea | Estado */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <div>
    <label>Línea</label>
    <select name="Linea" value={curso.Linea} onChange={handleChange} className="w-full border p-2 rounded-lg">
      <option value="">Selecciona una opción</option>
      {opcionesLinea.map((opcion) => (
        <option key={opcion.id} value={opcion.id}>{opcion.Especificacion}</option>
      ))}
    </select>
  </div>
  <div>
    <label>Estado</label>
    <select name="Estado" value={curso.Estado} onChange={handleChange} className="w-full border p-2 rounded-lg">
      <option value="">Selecciona una opción</option>
      {opcionesEstado.map((opcion) => (
        <option key={opcion.id} value={opcion.id}>{opcion.Especificacion}</option>
      ))}
    </select>
  </div>
</div>

{/* Modalidad | Unidad */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <div>
    <label>Modalidad</label>
    <select name="Modalidad" value={curso.Modalidad} onChange={handleChange} className="w-full border p-2 rounded-lg">
      <option value="">Selecciona una opción</option>
      {opcionesModalidad.map((opcion) => (
        <option key={opcion.id} value={opcion.id}>{opcion.Especificacion}</option>
      ))}
    </select>
  </div>
  <div>
    <label>Unidad</label>
    <select name="Unidad" value={curso.Unidad} onChange={handleChange} className="w-full border p-2 rounded-lg">
      <option value="">Selecciona una opción</option>
      {unidad.map((u) => (
        <option key={u.codigo} value={u.codigo}>{u.nombre}</option>
      ))}
    </select>
  </div>
</div>

{/* Profesor | Segundo Profesor */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <div>
    <label>Profesor</label>
    <select name="Profesor" value={curso.Profesor} onChange={handleChange} className="w-full border p-2 rounded-lg">
      <option value="">Selecciona una opción</option>
      {profesores.map((p) => (
        <option key={p.id_emp} value={p.id_emp}>{p.nombre}</option>
      ))}
    </select>
  </div>
  <div>
    <label>Segundo Profesor</label>
    <select name="SegundoPro" value={curso.SegundoPro} onChange={handleChange} className="w-full border p-2 rounded-lg">
      <option value="">Selecciona una opción</option>
      {profesores.map((p) => (
        <option key={p.id_emp} value={p.id_emp}>{p.nombre}</option>
      ))}
    </select>
  </div>
</div>

{/* Profesor Externo */}
<div>
  <label>Profesor Externo</label>
  <input type="text" name="Proexterno" value={curso.Proexterno} onChange={handleChange} className="w-full border p-2 rounded-lg" />
</div>

{/* Inicio Inscripciones | Fin Inscripciones */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <div>
    <label>Inicio Inscripciones</label>
    <input type="date" name="InicioInscr" value={curso.InicioInscr} onChange={handleChange} className="w-full border p-2 rounded-lg" />
  </div>
  <div>
    <label>Fin Inscripciones</label>
    <input type="date" name="FinInscr" value={curso.FinInscr} onChange={handleChange} className="w-full border p-2 rounded-lg" />
  </div>
</div>

{/* Tipo de curso | Descripción */}
<div className="grid grid-cols-1  gap-4">
  <div>
    <label>Tipo de curso</label>
    <select name="IdTipoCurso" value={curso.IdTipoCurso} onChange={handleChange} className="w-full border p-2 rounded-lg">
      <option value="">Selecciona una opción</option>
      {opcionesTipoCurso.map((opcion) => (
        <option key={opcion.id} value={opcion.id}>{opcion.Especificacion}</option>
      ))}
    </select>
  </div>
  <div>
    <label>Descripción</label>
    <input type="text" name="Descripcion" value={curso.Descripcion} onChange={handleChange} className="w-full border p-2 rounded-lg" />
  </div>
</div>

{/* Botón Guardar */}
<div className="text-center mt-6">
  <button type="submit" className="bg-[#990000] text-white px-6 py-2 rounded-lg hover:bg-red-800 transition-colors">Guardar Curso</button>
</div>
</form>
        </motion.div></div>
    </div>
  );
}
