    <form onSubmit={handleSubmit} className="space-y-4 seleccion-personalizada">
          {Object.keys(curso)
          .filter((key) => !["LunesIni", "LunesFin", "MartesIni", "MartesFin", "MiercolesIni", "MiercolesFin", "JuevesIni", "JuevesFin", "ViernesIni", "ViernesFin", "SabadoIni", "SabadoFin", "DomingoIni", "DomingoFin"]. includes(key))
          .map((key) => (
            <div key={key} className="mb-3">
              <label className="block font-semibold text-gray-700">
                {etiquetas[key as keyof typeof etiquetas] || key}</label>
              { key === "Inicio" || key === "Fin" ? (
                <input 
                type="date"
                name={key}
                value={curso[key as keyof typeof curso]}
                onChange={handleChange}
                className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-[#990000] outline-none"
                />
              ) : key === "Periodo" ? (
                <select
                name={key}
                value={curso[key as keyof typeof curso]}
                onChange={handleChange}
                className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-[#990000]">
                  <option value="">Selecciona una opción</option>
                  {opcionesPeriodos.map((opcion, index) => (
                    <option key={index} value={opcion.periodo}>
                      {opcion.periodo}
                    </option>
                  ))}
                </select>
           
          ) : key === "Profesor" || key === "SegundoPro" ? (
                <select
                name={key}
                value={curso[key as keyof typeof curso]}
                onChange={handleChange}
                className="w-full border p-2 rounded-lg   focus:ring-2 focus:ring-[#990000]">
                  <option value="" >Selecciona una opción</option>
                  {profesores.map((profesor) => (
                    <option key={profesor.id_emp} value={profesor.id_emp}>
                      {profesor.nombre}
                    </option>
                  ))}
                </select>

              ) : key === "Unidad" ? (
                <select
                name={key}
                value={curso[key as keyof typeof curso]}
                onChange={handleChange}
                className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-[#990000]">
                  <option value="">Selecciona una opción</option>
                  {unidad.map((unidad) => (
                    <option key={unidad.codigo} value={unidad.codigo}>
                      {unidad.nombre}
                    </option>
                  ))}
                </select>


              ) : key === "Publico" ? (
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
                 ) : key === "IdTipoCurso" ? (
                  <select name="IdTipoCurso" value={curso.IdTipoCurso} onChange={handleChange} className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-[#990000]">
                    <option value="">Selecciona una opción</option>
                    {opcionesTipoCurso.map((opcion) => (
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

        
             
                    ) : key === "InicioInscr" || key === "FinInscr" ? (
                      <input
                        type="date"
                        name={key}
                        value={curso[key as keyof typeof curso]}
                        onChange={handleChange}
                        className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-[#990000] outline-none"
                      />
                      
                  
              ) : (
                <input 
                  type={["Valor", "Horas", "CupoMax", "Estado", "Modalidad",  "IdTipoCurso", "SegundoPro"].includes(key) ? "number" : "text"} 
                  name={key}
                  value={curso[key as keyof typeof curso]}
                  onChange={handleChange}
                  className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-[#990000] outline-none"
                />
              )} 
            </div>
          ))}
          <h3 className="text-lg font-semibold mt-4">Horarios</h3>
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
          
          
          {/* BOTÓN GUARDAR */}
          <button type="submit" className="mt-4 w-full bg-[#990000] text-white py-2 rounded-lg hover:scale-105 transition">
            Guardar
          </button>
        </form>
