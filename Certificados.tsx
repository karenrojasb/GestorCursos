<body className="relative flex flex-col min-h-screen bg-gray-100 overflow-hidden">

  {/* Fondo decorativo gris (z-index -1) */}
  <div
    className="absolute bottom-0 right-0 w-[700px] h-[500px] z-[-2]"
    style={{
      backgroundColor: '#f3f4f6',
      clipPath: "path('M700,0 Q400,600 0,500 L0,0 Z')",
    }}
  ></div>

  {/* Imagen de fondo (también con z-[-1]) */}
  <div
    className="absolute bottom-0 right-0 w-[700px] h-[500px] bg-no-repeat bg-cover z-[-3]"
    style={{
      backgroundImage: "url('/img/_DSC0764-3.jpg')",
      clipPath: "path('M0,0 L700,0 L700,500 L0,500 Z M700,0 Q400,600 0,500 L0,0 Z')",
      clipRule: "evenodd",
    }}
  ></div>

  {/* Contenido de la app (z-index superior) */}
  <header className="z-10 w-full flex items-center justify-between px-6 py-2 bg-white shadow-md">
    ...
  </header>

  <main className="z-10 flex flex-col items-center justify-start flex-1 px-6 py-2">
    ...
  </main>

  <footer className="z-10 bg-white items-center py-2 shadow-inner w-full">
    ...
  </footer>
</body>