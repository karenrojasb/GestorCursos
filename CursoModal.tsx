<div className="p-10 rounded-xl shadow-black fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
     
      {errorMensaje && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-red-600  text-white px-6 py-3 rounded shadow-lg 
        z-50 animate">

        </div> 
      )}
     <div className="bg-white rounded-lg p-6 shadow-md max-w-6xl w-full h-[90vh] overflow-hidden flex flex-col">
          
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
      <button
            onClick={onClose}
            className=" text-gray-500 hover:text-[#990000] transition-transform duration-300 transform hover:rotate-90 hover:scale-110"
          >
            <XMarkIcon className="h-6 w-6" />
          </button> 
  

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
