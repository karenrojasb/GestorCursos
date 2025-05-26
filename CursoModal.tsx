Error: In HTML, <tr> cannot be a child of <div>.
This will cause a hydration error.

  ...
    <RedirectErrorBoundary router={{...}}>
      <Head>
      <link>
      <script>
      <script>
      <script>
      <script>
      <script>
      <script>
      <ClientSegmentRoot Component={function RootLayout} slots={{...}} params={{}}>
        <RootLayout params={Promise}>
          <html lang="es">
            <body className="bg-gray-10...">
              <header>
              <main className={"flex fle..."}>
                <motion.h1>
                <MainButtons publico={2} esAdmin={true} esProfesor={false} onSelect={function onSelect}>
                  <div className="seleccion-...">
                    <div>
                    <CatalogoModal onClose={function onClose}>
                      <div className="p-10 round...">
                        <div className="bg-white r...">
                          <div>
                          <div>
                          <div className="flex-1 ove...">
                            <div className="border-b py-2">
                              <div className="grid grid-...">
                                <span>
                                <span>
                                <span>
                                <div>
>                               <div
>                                 className={" bg-gray-100 p-4 mt-4 flex flex-col justify-center overflow-x-auto min-..."}
>                               >
                                  <div>
>                                 <tr className="border-t">
                                  ...
                            ...
                ...
              ...
      ...

    at createUnhandledError (http://localhost:3000/_next/static/chunks/node_modules_next_dist_client_523921._.js:689:49)
    at handleClientError (http://localhost:3000/_next/static/chunks/node_modules_next_dist_client_523921._.js:856:56)
    at console.error (http://localhost:3000/_next/static/chunks/node_modules_next_dist_client_523921._.js:991:56)
    at validateDOMNesting (http://localhost:3000/_next/static/chunks/node_modules_next_dist_compiled_react-dom_1f56dc._.js:1804:212)
    at completeWork (http://localhost:3000/_next/static/chunks/node_modules_next_dist_compiled_react-dom_1f56dc._.js:7273:25)
    at runWithFiberInDEV (http://localhost:3000/_next/static/chunks/node_modules_next_dist_compiled_react-dom_1f56dc._.js:631:20)
    at completeUnitOfWork (http://localhost:3000/_next/static/chunks/node_modules_next_dist_compiled_react-dom_1f56dc._.js:8020:23)
    at performUnitOfWork (http://localhost:3000/_next/static/chunks/node_modules_next_dist_compiled_react-dom_1f56dc._.js:7957:28)
    at workLoopSync (http://localhost:3000/_next/static/chunks/node_modules_next_dist_compiled_react-dom_1f56dc._.js:7847:40)
    at renderRootSync (http://localhost:3000/_next/static/chunks/node_modules_next_dist_compiled_react-dom_1f56dc._.js:7830:13)
    at performWorkOnRoot (http://localhost:3000/_next/static/chunks/node_modules_next_dist_compiled_react-dom_1f56dc._.js:7565:211)
    at performSyncWorkOnRoot (http://localhost:3000/_next/static/chunks/node_modules_next_dist_compiled_react-dom_1f56dc._.js:8402:9)
    at flushSyncWorkAcrossRoots_impl (http://localhost:3000/_next/static/chunks/node_modules_next_dist_compiled_react-dom_1f56dc._.js:8326:245)
    at flushSyncWork$1 (http://localhost:3000/_next/static/chunks/node_modules_next_dist_compiled_react-dom_1f56dc._.js:7709:86)
    at Object.scheduleRefresh (http://localhost:3000/_next/static/chunks/node_modules_next_dist_compiled_react-dom_1f56dc._.js:298:13)
    at http://localhost:3000/_next/static/chunks/node_modules_next_dist_compiled_107ce8._.js:395:33
    at Set.forEach (<anonymous>)
    at Object.performReactRefresh (http://localhost:3000/_next/static/chunks/node_modules_next_dist_compiled_107ce8._.js:388:38)
    at applyUpdate (http://localhost:3000/_next/static/chunks/node_modules_next_dist_compiled_107ce8._.js:885:31)
    at http://localhost:3000/_next/static/chunks/node_modules_next_dist_compiled_107ce8._.js:893:13const fetchInscripcionesCurso = async (idCurso: number) => {
  try {
    const response = await fetch(`http://localhost:8090/api/inscripciones/curso/${idCurso}`);
    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
    const data = await response.json();
    setInscripciones(prev => ({ ...prev, [idCurso]: data }));
  } catch (error) {
    console.error(`Error al obtener inscripciones del curso ${idCurso}:`, error);
  }
};


{expandedCursoId === curso.id && (
  <div className="mt-4 border-t pt-4">
    <h3 className="text-lg font-semibold text-[#990000] mb-2">Inscritos</h3>
    <table className="w-full text-sm border">
      <thead className="bg-gray-100">
        <tr>
          <th className="text-left p-2 border">Documento</th>
          <th className="text-left p-2 border">Fecha Registro</th>
          <th className="text-left p-2 border">Nota</th>
        </tr>
      </thead>
      <tbody>
        {inscripciones[curso.id]?.map((inscrito) => (
          <tr key={inscrito.id} className="border-t">
            <td className="p-2 border">{inscrito.docInscr}</td>
            <td className="p-2 border">{new Date(inscrito.fecreg).toLocaleDateString()}</td>
            <td className="p-2 border">
              {inscrito.Nota !== undefined ? (
                <>
                  {inscrito.Nota} {" "}
                  {opciones.find(o => o.id === inscrito.Nota)?.Especificacion || ""}
                </>
              ) : (
                "Sin nota"
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}
