  <div className="relative bg-gray-100 p-6  flex mt-5 justify-center overflow-x-auto min-w-[680px]">
  <table className="border-collapse w-auto text-sm shadow-lg rounded-lg overflow-hidden ">
    <thead className="bg-[#990000] text-white font-semibold">
      <tr>
        <th className="border px-4 py-2">Nombre del curso</th>
        <th className="border px-4 py-2">ID</th>
        <th className="border px-4 py-2">Valor</th>
        <th className="border px-4 py-2">Público</th>
        <th className="border px-4 py-2">Periodo</th>
      </tr>
    </thead>
    <tbody>
      <tr className="bg-gray-50 ">
        <td className="border px-4 py-2">{curso.NombreCurso}</td>
        <td className="border px-4 py-2">{curso.id}</td>
        <td className="border px-4 py-2">{curso.Valor}</td>
        <td className="border px-4 py-2">{curso.Publico}</td>
        <td className="border px-4 py-2">{curso.Periodo}</td>
      </tr>

      <tr >
        <th className="border px-4 py-2 bg-[#990000] text-white">Fecha de Inicio</th>
        <th className="border px-4 py-2 bg-[#990000] text-white">Fecha de Fin</th>
        <th className="border px-4 py-2 bg-[#990000] text-white">Horas</th>
        <th className="border px-4 py-2 bg-[#990000] text-white">Horario</th> 
        <th className="border px-4 py-2 bg-[#990000] text-white">Cupo Máximo</th>

      </tr>
      <tr className="bg-gray-50  ">
        <td className="border px-4 py-2 ">{curso.Inicio}</td>
        <td className="border px-4 py-2">{curso.Fin}</td>
        <td className="border px-4 py-2">{curso.Horas}</td>
        <td className="border px-4 py-2">{formatearHorario(curso).map((h, index) => (
          <div key={index}>
            <strong>{h.dia}</strong> {h.ini} - {h.fin}
          </div>
        ))}</td>
        <td className="border px-4 py-2">{curso.CupoMax}</td>
        
      </tr>

      <tr>
        <th className="border px-4 py-2 bg-[#990000] text-white">Lugar</th>
        <th className="border px-4 py-2 bg-[#990000] text-white">Línea</th>
        <th className="border px-4 py-2 bg-[#990000] text-white">Estado</th>
        <th className="border px-4 py-2 bg-[#990000] text-white">Modalidad</th>
      
        <th className="border px-4 py-2 bg-[#990000] text-white">Profesor</th>
      </tr>
      <tr className="bg-gray-50 ">
        <td className="border px-4 py-2">{curso.Lugar}</td>
        <td className="border px-4 py-2">{curso.Linea}</td>
        <td className="border px-4 py-2">{curso.Estado}</td>
        <td className="border px-4 py-2">{curso.Modalidad}</td>
        <td className="border px-4 py-2">{curso.NombreProfesor}</td>
      </tr>

      <tr>
         
        <th className="border px-4 py-2 bg-[#990000] text-white">Segundo Profesor</th>
        <th className="border px-4 py-2 bg-[#990000] text-white">Profesor Externo</th>
        <th className="border px-4 py-2 bg-[#990000] text-white">Unidad</th>
        <th className="border px-4 py-2 bg-[#990000] text-white">Tipo de Curso</th>
        <th className="border px-4 py-2 bg-[#990000] text-white" >Descripción</th>
      </tr>
      <tr className="bg-gray-50 ">
      
       <td className="border px-4 py-2">{curso.SegundoPro}</td>
       <td className="border px-4 py-2">{curso.Proexterno}</td>
       <td className="border px-4 py-2">{curso.Unidad}</td>
        <td className="border px-4 py-2">{curso.IdTipoCurso}</td>
        <td className="border px-4 py-2"   >{curso.Descripcion}</td>
        
      </tr>
      
    </tbody>
  </table>
</div>            
                     
              
