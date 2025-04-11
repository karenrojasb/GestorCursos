{esProfesor && (
  <>
    {/* BOTÓN GESTOR DE CURSOS - PROFESOR */}
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setShowProfesorModal(true)}
      className="flex items-center justify-center gap-3 w-4/5 bg-[#990000] hover:bg-red-700
                 text-white py-3 rounded-lg shadow-md transition-all hover:shadow-lg"
    >
      <PencilIcon className="h-6 w-6 text-white" />
      Vista Profesor
    </motion.button>

    {/* MODAL PARA PROFESOR */}
    {showProfesorModal && (
      <div className="p-6 rounded-lg shadow-lg fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="relative flex flex-col items-center gap-3 w-full max-w-3xl bg-white 
                        py-6 px-8 rounded-lg shadow-md">

          {/* BOTÓN CERRAR */}
          <button
            onClick={() => setShowProfesorModal(false)}
            className="absolute top-2 right-2 text-gray-500 hover:text-[#990000] transition-transform duration-300 transform hover:rotate-90 hover:scale-110"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>

          {/* TÍTULO */}
          <h2 className="text-3xl font-bold text-[#990000] text-center">Gestor del Profesor</h2>

          <div className="w-full flex flex-col items-center justify-center space-y-3 text-center">
            {/* BOTÓN CATÁLOGO */}
            <motion.button
              whileHover={{ scale: 1.1, backgroundColor: "#b30000" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                console.log("Catálogo profesor");
                setShowCatalogo(true);
                setShowProfesorModal(false);
              }}
              className="flex items-center gap-3 w-4/5 bg-[#990000] text-white py-3 rounded-lg transition-all hover:shadow-lg justify-center"
            >
              <BookOpenIcon className="h-6 w-6 text-white" />
              Catálogo de Cursos
            </motion.button>

            {/* BOTÓN REPORTES */}
            <motion.button
              whileHover={{ scale: 1.1, backgroundColor: "#b30000" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                console.log("Reportes profesor");
                setShowInscritosModal(true);
                setShowProfesorModal(false);
              }}
              className="flex items-center gap-3 w-4/5 bg-[#990000] text-white py-3 rounded-lg transition-all hover:shadow-lg justify-center"
            >
              <ChartBarIcon className="h-6 w-6 text-white" />
              Reportes
            </motion.button>
          </div>
        </div>
      </div>
    )}
  </>
)}