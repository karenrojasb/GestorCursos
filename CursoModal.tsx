rted +180ms
DTO recibido: {
  idCurso: 473,
  idInscrito: 1032402874,
  idRegistro: 1032402874,
  Nota: 33
}
Error al crear la nota: PrismaClientKnownRequestError: 
Invalid `prisma.$executeRawUnsafe()` invocation:


Raw query failed. Code: `207`. Message: `Invalid column name 'Accion'.`
    at Bn.handleRequestError (C:\Users\desarrollador5\Documents\gestor_cursos\node_modules\@prisma\client\runtime\library.js:121:7362)
    at Bn.handleAndLogRequestError (C:\Users\desarrollador5\Documents\gestor_cursos\node_modules\@prisma\client\runtime\library.js:121:6686)
    at Bn.request (C:\Users\desarrollador5\Documents\gestor_cursos\node_modules\@prisma\client\runtime\library.js:121:6393)
    at async l (C:\Users\desarrollador5\Documents\gestor_cursos\node_modules\@prisma\client\runtime\library.js:130:9645)
    at async NotasService.createNote (C:\Users\desarrollador5\Documents\gestor_cursos\src\notas\notas.service.ts:102:7)
    at async C:\Users\desarrollador5\Documents\gestor_cursos\node_modules\@nestjs\core\router\router-execution-context.js:46:28
    at async C:\Users\desarrollador5\Documents\gestor_cursos\node_modules\@nestjs\core\router\router-proxy.js:9:17 {
  code: 'P2010',
  clientVersion: '6.8.2',
  meta: { code: '207', message: "Invalid column name 'Accion'." }
}
[Nest] 16292  - 26/05/2025, 4:49:06 p. m.   ERROR [ExceptionsHandler] Error: No se pudo crear la nota:
Invalid `prisma.$executeRawUnsafe()` invocation:


Raw query failed. Code: `207`. Message: `Invalid column name 'Accion'.`
    at NotasService.createNote (C:\Users\desarrollador5\Documents\gestor_cursos\src\notas\notas.service.ts:111:11)
    at async C:\Users\desarrollador5\Documents\gestor_cursos\node_modules\@nestjs\core\router\router-execution-context.js:46:28
    at async C:\Users\desarrollador5\Documents\gestor_cursos\node_modules\@nestjs\core\router\router-proxy.js:9:17
