{showSuccess && (
  <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 z-[9999]">
    <div className="animate-check-spin scale-125">
      <CheckCircleIcon className="h-32 w-32 text-green-500" />
    </div>
    <p className="text-white text-2xl font-bold mt-2 animate-fade-in">Curso actualizado</p>
  </div>
)}