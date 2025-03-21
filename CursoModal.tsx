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
  });

  const [opcionesPublico, setOpcionesPublico] = useState<Opcion[]>([]);
  const [opcionesLinea, setOpcionesLinea] = useState<Opcion[]>([]);
  const [opcionesModalidad, setOpcionesModalidad] = useState<Opcion[]>([]);
  const [opcionesEstado, setOpcionesEstado] = useState<Opcion[]>([]);
  const [opcionesTipoCurso, setOpcionesTipoCurso] = useState<Opcion[]>([]);
  const [profesores, setProfesores] = useState<{ nombre: string}[]>([]);

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
    setCurso((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const cursoData = Object.keys(curso).reduce((acc, key) => {
      const value = curso[key as keyof typeof curso];

      if (value !== "") {
        acc[key] = ["Valor", "Horas", "CupoMax", "Publico", "Linea", "Estado", "Modalidad", "Unidad", "Profesor", "IdTipoCurso", "SegundoPro", "Proexterno"].includes(key)
          ? Number(value) || null 
          : value; 
      } else if (["SegundoPro", "Proexterno", "Descripcion"].includes(key)) {
        acc[key] = null;
      }

      return acc;
    }, {} as Record<string, any>);

    onSave(cursoData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-md transition-transform transform scale-95 opacity-100 animate-fade-in max-h-[80vh] overflow-y-auto">
        <motion.div
        className="relative bg-white p-8 rounded-lg shadow-lg w-full max-w-lg overflow-y-auto"
        initial={{ opacity: 0, scale: 0.95}}
        animate={{ opacity: 1, scale: 1}}
        exit={{ opacity: 0, scale: 0.95}}
        transition={{ duration: 0.3}}
        >

        {/* BOTÓN PARA CERRAR LA VENTANA */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-500 hover:text-[#990000] transition-transform duration-300 hover:rotate-90"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold text-[#990000] text-center- mb-6 ">Crear Curso</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {Object.keys(curso).map((key) => (
            <div key={key} className="mb-3">
              <label className="block font-semibold text-gray-700">{key}:</label>
              { key === "Inicio" || key === "Fin" ? (
                <input 
                type="date"
                name={key}
                value={curso[key as keyof typeof curso]}
                onChange={handleChange}
                className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-[#990000] outline-none"
                />
              )
              : key === "Publico" ? (
                <select name="Publico" 
                value={curso.Publico} 
                onChange={handleChange} 
                className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-[#990000]">
                  <option value="">Selecciona una opción</option>
                  {opcionesPublico.map((opcion) => (
                    <option key={opcion.id} value={opcion.id}>
                      {opcion.Especificacion}
                    </option>
                  ))}
                </select>
              ) : key === "Linea" ? (
                <select name="Linea" value={curso.Linea} onChange={handleChange} className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-[#990000]">
                  <option value="">Selecciona una opción</option>
                  {opcionesLinea.map((opcion) => (
                    <option key={opcion.id} value={opcion.id}>
                      {opcion.Especificacion}
                    </option>
                  ))}
                </select>
              ) : key === "Modalidad" ? (
                <select name="Modalidad" value={curso.Modalidad} onChange={handleChange} className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-[#990000]">
                  <option value="">Selecciona una opción</option>
                  {opcionesModalidad.map((opcion) => (
                    <option key={opcion.id} value={opcion.id}>
                      {opcion.Especificacion}
                    </option>
                  ))}
                </select>
              ) : key === "Estado" ? (
                <select name="Estado" value={curso.Estado} onChange={handleChange} className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-[#990000]">
                  <option value="">Selecciona una opción</option>
                  {opcionesEstado.map((opcion) => (
                    <option key={opcion.id} value={opcion.id}>
                      {opcion.Especificacion}
                    </option>
                  ))}
                </select>
              ) : key === "IdTipoCurso" ? (
                <select name="IdTipoCurso" value={curso.IdTipoCurso} onChange={handleChange} className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-[#990000]">
                  <option value="">Selecciona una opción</option>
                  {opcionesTipoCurso.map((opcion) => (
                    <option key={opcion.id} value={opcion.id}>
                      {opcion.Especificacion}
                    </option>
                  ))}
                  
                  </select>
              ) : key === "Profesor" ? (
                <select name="Preeofesor" value={curso.Profesor} onChange={handleChange} className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-[#990000]">
                  <option value="">Selecciona una opción</option>
                  {profesores.map((profesor, index) => (
                    <option key={index} value={profesor.nombre}>
                      {profesor.nombre}
                    </option>
                  ))}

                   </select>
              ) : key === "SegundoPro" ? (
                <select name="SegundoPro" value={curso.SegundoPro} onChange={handleChange} className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-[#990000]">
                  <option value="">Selecciona una opción</option>
                  {profesores.map((profesor, index) => (
                    <option key={index} value={profesor.nombre}>
                      {profesor.nombre}
                    </option>
                  ))}
                </select>

                
              ) : (
                <input 
                  type={["Valor", "Horas", "CupoMax", "Estado", "Modalidad", "Unidad", "IdTipoCurso", "SegundoPro", "Proexterno"].includes(key) ? "number" : "text"} 
                  name={key}
                  value={curso[key as keyof typeof curso]}
                  onChange={handleChange}
                  className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-[#990000] outline-none"
                />
              )} 
            </div>
          ))}
          
          {/* BOTÓN GUARDAR */}
          <button type="submit" className="mt-4 w-full bg-[#990000] text-white py-2 rounded-lg hover:scale-105 transition">
            Guardar
          </button>
        </form>
        </motion.div></div>
    </div>
  );
}
