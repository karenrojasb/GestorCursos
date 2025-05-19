<form onSubmit={handleSubmit} className="space-y-4">
         
          <label className="block font-semibold text-gray-700">
            Nombre:
            <input
  type="text"
  name="NombreCurso"
  value={formData.NombreCurso || ""}
  onChange={handleChange}
  required
   className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-[#990000] outline-none"
/>
          </label>

          <label className="block font-semibold text-gray-700">
            Valor:
            <input
  type="number"
  name="Valor"
  value={formData.Valor ?? 0}
  onChange={handleChange}
  required
   className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-[#990000] outline-none"
/>
          </label>

          <label className="block font-semibold text-gray-700">
  Público:
  <select
    name="Publico"
    value={formData.Publico}
     className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-[#990000] outline-none"
    onChange={(e) =>
      setFormData((prev) => ({
        ...prev,
        Publico: Number(e.target.value), 
      }))
    }
    required
  >
    <option value="">Seleccione una opción</option>
    {opcionesPublico.map((opcion) => (
      <option key={opcion.id} value={opcion.id}>
        {opcion.Especificacion}
      </option>
    ))}
  </select>
</label>

<label className="block font-semibold text-gray-700">
  Periodo:
  <select
    name="Periodo"
    value={formData.Periodo}
     className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-[#990000] outline-none"
    onChange={(e) =>
      setFormData((prev) => ({
        ...prev,
        Periodo: String(e.target.value), 
      }))
    }
    required
  >
    <option value="">Seleccione una opción</option>
    {opcionesPeriodos.map((opcion, index) => (
      <option key={index} value={opcion.periodo}>
        {opcion.periodo}
      </option>
    ))}
  </select>
</label>

         
<label className="block font-semibold text-gray-700">
  Fecha de inicio Curso:
  <input
    type="date"
    name="Inicio"
    value={formData.Inicio ? formData.Inicio.split("T")[0] : ""}
    className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-[#990000] outline-none"
    onChange={handleChange}
    required
  />
</label>

<label className="block font-semibold text-gray-700">
  Fecha fin Curso:
  <input
    type="date"
    name="Fin"
    value={formData.Fin ? formData.Fin.split("T")[0] : ""}
    className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-[#990000] outline-none"
    onChange={handleChange}
    required
  />
</label>


          <label className="block font-semibold text-gray-700">
            Horas:
            <input
  type="number"
  name="Horas"
  value={formData.Horas ?? 0}
  onChange={handleChange}
  className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-[#990000] outline-none"
  required
/>
          </label >

          <label className="block font-semibold text-gray-700">
  Fecha de Inicio Inscripciones:
  <input
    type="date"
    name="InicioInscr"
    value={formData.InicioInscr ? formData.InicioInscr.split("T")[0] : ""}
    className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-[#990000] outline-none"
    onChange={handleChange}
    required
  />
</label>

<label className="block font-semibold text-gray-700">
  Fecha de Cierre Inscripciones:
  <input
    type="date"
    name="FinInscr"
    value={formData.FinInscr ? formData.FinInscr.split("T")[0] : ""}
    className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-[#990000] outline-none"
    onChange={handleChange}
    required
  />
</label>

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
            value={formData[`${dia}Ini` as keyof typeof formData] || ""}
            onChange={handleChange}
            className="w-full border p-1 rounded-lg focus:ring-2 focus:ring-[#990000] outline-none"
          />
        </td>
        <td className="border border-gray-300 px-2 py-1">
          <input
            type="time"
            name={`${dia}Fin`}
            value={formData[`${dia}Fin` as keyof typeof formData] || ""}
            onChange={handleChange}
            className="w-full border p-1 rounded-lg focus:ring-2 focus:ring-[#990000] outline-none"
          />
        </td>
      </tr>
    ))}
  </tbody>
</table>


          <label  className="block font-semibold text-gray-700">
            Cupo Máximo:
            <input
  type="number"
  name="CupoMax"
  value={formData.CupoMax ?? 0}
  onChange={handleChange}
  className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-[#990000] outline-none"
  required
/>
          </label>

          <label  className="block font-semibold text-gray-700">
            Lugar:
            <input
  type="text"
  name="Lugar"
  value={formData.Lugar || ""}
  onChange={handleChange}
  className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-[#990000] outline-none"
  required
/>
          </label>

          <label  className="block font-semibold text-gray-700">
  Línea
  <select
    name="Linea"
    value={formData.Linea}
    className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-[#990000] outline-none"
    onChange={(e) =>
      setFormData((prev) => ({
        ...prev,
        Linea: Number(e.target.value), 
      }))
    }
    required
  >
    <option value="">Seleccione una opción</option>
    {opcionesLinea.map((opcion) => (
      <option key={opcion.id} value={opcion.id}>
        {opcion.Especificacion}
      </option>
    ))}
  </select>
</label>

<label  className="block font-semibold text-gray-700">
  Estado:
  <select
    name="Estado"
    value={formData.Estado}
    className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-[#990000] outline-none"
    onChange={(e) =>
      setFormData((prev) => ({
        ...prev,
        Estado: Number(e.target.value), 
      }))
    }
    required
  >
    <option value="">Seleccione una opción</option>
    {opcionesEstado.map((opcion) => (
      <option key={opcion.id} value={opcion.id}>
        {opcion.Especificacion}
      </option>
    ))}
  </select>
</label>

<label  className="block font-semibold text-gray-700">
  Modalidad:
  <select
    name="Modalidad"
    className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-[#990000] outline-none"
    value={formData.Modalidad ?? ""}
    onChange={(e) =>
      setFormData((prev) => ({
        ...prev,
        Modalidad: Number(e.target.value),
      }))
    }
    required
  >
    <option value="">Seleccione una opción</option>
    {opcionesModalidad.map((opcion) => (
      <option key={opcion.id} value={opcion.id}>
        {opcion.Especificacion}
      </option>
    ))}
  </select>
</label>

<label className="block font-semibold text-gray-700">
  Unidad:
  <select
    name="Unidad"
    value={formData.Unidad}
    className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-[#990000] outline-none"
    onChange={(e) =>
      setFormData((prev) => ({
        ...prev,
        Unidad: Number(e.target.value), 
      }))
    }
    required
  >
    <option value="">Seleccione una opción</option>
    {unidad.map((unidad) => (
                    <option key={unidad.codigo} value={unidad.codigo}>
                      {unidad.nombre}
                    </option>
                  ))}
  </select>
</label>  


<label className="block font-semibold text-gray-700">
 Profesor:
  <select
    name="Profesor"
    value={formData.Profesor}
    className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-[#990000] outline-none"
    onChange={(e) =>
      setFormData((prev) => ({
        ...prev,
        Profesor: Number(e.target.value),
      }))
    }
  >
    <option value={formData.Profesor}>
      {formData.Profesor
        ? profesores.find((p) => Number(p.id_emp) === Number(formData.Profesor))?.nombre || "Seleccione una opción"
        : "Seleccione una opción"}
    </option>
    
    {profesores
      .filter((p) => Number(p.id_emp) !== Number(formData.Profesor)) // evitar duplicado
      .map((profesor) => (
        <option key={profesor.id_emp} value={profesor.id_emp}>
          {profesor.nombre}
        </option>
      ))}
  </select>
</label>
           
       
<label className="block font-semibold text-gray-700">
  Segundo Profesor:
  <select
    name="SegundoPro"
    value={formData.SegundoPro !== undefined ? formData.SegundoPro : ""}
    className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-[#990000] outline-none"
    onChange={(e) =>
      setFormData((prev) => ({
        ...prev,
        SegundoPro: Number(e.target.value),
      }))
    }
  >
    <option value={formData.SegundoPro}>
      {formData.SegundoPro
        ? profesores.find((p) => Number(p.id_emp) === Number(formData.SegundoPro))?.nombre || "Seleccione una opción"
        : "Seleccione una opción"}
    </option>
    
    {profesores
      .filter((p) => Number(p.id_emp) !== Number(formData.SegundoPro)) // evitar duplicado
      .map((profesor) => (
        <option key={profesor.id_emp} value={profesor.id_emp}>
          {profesor.nombre}
        </option>
      ))}
  </select>
</label>


          <label className="block font-semibold text-gray-700">
            Profesor Externo:
            <input
  type="text"
  name="Proexterno"
  value={formData.Proexterno ?? ""}
  className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-[#990000] outline-none"
  onChange={handleChange}
  
/>
          </label>   

          <label className="block font-semibold text-gray-700">
  Tipo de Curso:
  <select
    name="IdTipoCurso"
    value={formData.IdTipoCurso}
    className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-[#990000] outline-none"
    onChange={(e) =>
      setFormData((prev) => ({
        ...prev,
        IdTipoCurso: Number(e.target.value), 
      }))
    }
    required
  >
    <option value="">Seleccione una opción</option>
    {opcionesTipoCurso.map((opcion) => (
      <option key={opcion.id} value={opcion.id}>
        {opcion.Especificacion}
      </option>
    ))}
  </select>
</label>

          <label className="block font-semibold text-gray-700">
            Descripción:
            <input
  type="text"
  name="Descripcion"
  value={formData.Descripcion ?? 0}
  className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-[#990000] outline-none"
  onChange={handleChange}
  required
/>
          </label>  

          <div className="flex modal-actions justify-center gap-4 ">
            <button type="submit"
             className="mt-6 h-14 w-64  bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg hover:scale-105 transition">
              Actualizar
              </button>
            <button 
            type="button" 
            onClick={onClose}
            className="mt-6 h-14 w-64 bg-[#990000] hover:bg-red-700 text-white py-2 rounded-lg hover:scale-105 transition">
              Cancelar
            </button>
          </div>
        </form>

        

