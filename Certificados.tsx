{/* BARRA DE BÚSQUEDA ANIMADA */}
<div className="relative flex items-center">
  <button
    onClick={() => setIsSearchActive((prev) => !prev)}
    className="p-2 rounded-full bg-gray-200"
  >
    <MagnifyingGlassIcon className="h-6 w-6 text-[#990000]" />
  </button>
  <input
    type="text"
    placeholder="Buscar por ID, Nombre o Fecha"
    value={busqueda}
    onChange={handleBuscar}
    className={`ml-2 px-4 py-2 border rounded-full transition-all duration-300 ease-in-out 
      ${isSearchActive ? "w-72 opacity-100" : "w-0 opacity-0"} 
      focus:outline-none bg-white`}
    style={{ minWidth: isSearchActive ? "18rem" : "0", overflow: "hidden" }}
  />
</div>





const handleMouseLeave = () => {
  if (busqueda === "") {
    setIsSearchActive(false);
  }
};