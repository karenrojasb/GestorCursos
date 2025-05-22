Error: In HTML, <select> cannot be a child of <tr>.
This will cause a hydration error.

  ...
    <html lang="es">
      <body className="bg-gray-10...">
        <header>
        <main className={"flex fle..."}>
          <motion.h1>
          <MainButtons publico={2} esAdmin={true} esProfesor={false} onSelect={function onSelect}>
            <div className="flex flex-...">
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
                          <div className={" bg-gray..."}>
                            <div>
                            <div className="mt-2 w-full">
                              <table className="min-w-full...">
                                <thead>
                                <tbody>
>                                 <tr className="text-gray-700 text-center">
                                    <td>
                                    <td>
                                    <td>
                                    <td>
                                    <td>
                                    <td>
                                    <td>
>                                   <select
>                                     className="border rounded px-2 py-1 text-sm bg-white"
>                                     value=""
>                                     onChange={function onChange}
>                                   >
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
    at processRootScheduleInMicrotask (http://localhost:3000/_next/static/chunks/node_modules_next_dist_compiled_react-dom_1f56dc._.js:8343:9)
    at http://localhost:3000/_next/static/chunks/node_modules_next_dist_compiled_react-dom_1f56dc._.js:8413:126
