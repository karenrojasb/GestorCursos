import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/outline";

const FormularioCurso = ({ curso, setCurso, handleSubmit, etiquetas, opciones }) => {
  const [seccionesVisibles, setSeccionesVisibles] = useState({
    infoBasica: true,
    horarios: true
  });

  const toggleSeccion = (seccion) => {
    setSeccionesVisibles((prev) => ({ ...prev, [seccion]: !prev[seccion] }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurso((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-[#990000] text-center mb-6">Crear Curso</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* SECCIÓN: INFORMACIÓN GENERAL DEL CURSO */}
        <div>
          <div 
            className="flex justify-between items-center cursor-pointer bg-gray-200 p-2 rounded-md"
            onClick={() => toggleSeccion("infoBasica")}
          >
            <h3 className="text-lg font-semibold">Información del Curso</h3>
            {seccionesVisibles.infoBasica ? <ChevronUpIcon className="w-5 h-5" /> : <ChevronDownIcon className="w-5 h-5" />}
          </div>

          {seccionesVisibles.infoBasica && (
            <div className="p-2">
              {Object.keys(curso)
                .filter((key) => !["LunesIni", "LunesFin", "MartesIni", "MartesFin", "MiercolesIni", "MiercolesFin", "JuevesIni", "JuevesFin", "ViernesIni", "ViernesFin", "SabadoIni", "SabadoFin", "DomingoIni", "DomingoFin"].includes(key))
                .map((key) => (
                  <div key={key} className="mb-3">
                    <label className="block font-semibold text-gray-700">
                      {etiquetas[key] || key}
                    </label>
                    {["Inicio", "Fin"].includes(key) ? (
                      <input 
                        type="date"
                        name={key}
                        value={curso[key] || ""}
                        onChange={handleChange}
                        className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-[#990000] outline-none"
                      />
                    ) : opciones[key] ? (
                      <select
                        name={key}
                        value={curso[key] || ""}
                        onChange={handleChange}
                        className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-[#990000]"
                      >
                        <option value="">Selecciona una opción</option>
                        {opciones[key].map((opcion) => (
                          <option key={opcion.id} value={opcion.id}>
                            {opcion.Especificacion}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input 
                        type={["Valor", "Horas", "CupoMax"].includes(key) ? "number" : "text"} 
                        name={key}
                        value={curso[key] || ""}
                        onChange={handleChange}
                        className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-[#990000] outline-none"
                      />
                    )}
                  </div>
                ))}
            </div>
          )}
        </div>

        {/* SECCIÓN: HORARIOS */}
        <div>
          <div 
            className="flex justify-between items-center cursor-pointer bg-gray-200 p-2 rounded-md"
            onClick={() => toggleSeccion("horarios")}
          >
            <h3 className="text-lg font-semibold">Horarios</h3>
            {seccionesVisibles.horarios ? <ChevronUpIcon className="w-5 h-5" /> : <ChevronDownIcon className="w-5 h-5" />}
          </div>

          {seccionesVisibles.horarios && (
            <div className="p-2">
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
                          value={curso[`${dia}Ini`] || ""}
                          onChange={handleChange}
                          className="w-full border p-1 rounded-lg focus:ring-2 focus:ring-[#990000] outline-none"
                        />
                      </td>
                      <td className="border border-gray-300 px-2 py-1">
                        <input
                          type="time"
                          name={`${dia}Fin`}
                          value={curso[`${dia}Fin`] || ""}
                          onChange={handleChange}
                          className="w-full border p-1 rounded-lg focus:ring-2 focus:ring-[#990000] outline-none"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* BOTÓN GUARDAR */}
        <button type="submit" className="mt-4 w-full bg-[#990000] text-white py-2 rounded-lg hover:scale-105 transition">
          Guardar
        </button>
      </form>
    </div>
  );
};

export default FormularioCurso;