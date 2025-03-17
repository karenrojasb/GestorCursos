import { useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
    Inicio: new Date(),
    Fin: new Date(),
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

  const handleDateChange = (date: Date | null, field: string) => {
    if (date) {
      setCurso((prev) => ({
        ...prev,
        [field]: date,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(curso);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <motion.div 
        className="relative bg-white p-8 rounded-lg shadow-lg w-full max-w-lg overflow-y-auto"
        initial={{ opacity: 0, scale: 0.95 }} 
        animate={{ opacity: 1, scale: 1 }} 
        exit={{ opacity: 0, scale: 0.95 }} 
        transition={{ duration: 0.3 }}
      >
        
        {/* Botón de cerrar */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-500 hover:text-[#990000] transition-all duration-300 hover:rotate-90"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold text-[#990000] text-center mb-6">Crear Curso</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {Object.keys(curso).map((key, index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <label className="block font-semibold text-gray-700">{key}:</label>

              {key === "Inicio" || key === "Fin" ? (
                <DatePicker
                  selected={curso[key as keyof typeof curso] as Date}
                  onChange={(date) => handleDateChange(date, key)}
                  dateFormat="yyyy-MM-dd"
                  className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-[#990000] outline-none"
                />
              ) : key === "Publico" ? (
                <select name="Publico" value={curso.Publico} onChange={handleChange} className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-[#990000]">
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
              ) : (
                <input 
                  type={["Valor", "Horas", "CupoMax"].includes(key) ? "number" : "text"} 
                  name={key}
                  value={curso[key as keyof typeof curso]}
                  onChange={handleChange}
                  className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-[#990000] outline-none"
                />
              )}
            </motion.div>
          ))}

          <motion.button 
            type="submit" 
            className="mt-4 w-full bg-[#990000] text-white py-3 rounded-lg hover:scale-105 transition duration-300 font-semibold shadow-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Guardar Curso
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}