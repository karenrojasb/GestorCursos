{showSuccess && (
  <motion.div
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    exit={{ scale: 0 }}
    transition={{ duration: 0.5 }}
    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
  >
    <div className="flex flex-col items-center justify-center bg-white p-6 rounded-xl shadow-lg border-2 border-green-600">
      <svg
        className="w-20 h-20 text-green-600"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
      <p className="text-green-700 font-bold mt-4 text-xl">Curso actualizado</p>
    </div>
  </motion.div>
)}