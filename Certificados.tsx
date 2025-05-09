               <div className="relative flex items-center"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}>
                   <button onClick={() => setIsSearchActive(!isSearchActive)} className="p-2 rounded-full bg-gray-200">
                     <MagnifyingGlassIcon className="h-6 w-6 text-[#990000]" />
                   </button>
                   <input
                     type="text"
                     placeholder="Busque el nombre del curso"
                     value={busqueda}
                     onChange={handleBuscar}
                     className={`px-4 w-full py-2 border rounded-full transition-all duration-500 ease-in-out 
                       ${isSearchActive ? "w-96 opacity-100 bg-white shadow-md" : "w-0 opacity-0"} focus:outline-none`}
                   /> 
                   </div>
