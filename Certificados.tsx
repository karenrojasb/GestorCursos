DTO recibido: {
  idCurso: 455,
  idInscrito: 1000034366,
  idRegistro: 1000034366,
  Nota: 33
}
Error al crear la nota: PrismaClientKnownRequestError: 
Invalid `prisma.$executeRawUnsafe()` invocation:


Raw query failed. Code: `207`. Message: `Invalid column name 'idNota'.`
    at Bn.handleRequestError (C:\Users\desarrollador5\Documents\gestor_cursos\node_modules\@prisma\client\runtime\library.js:121:7362)
    at Bn.handleAndLogRequestError (C:\Users\desarrollador5\Documents\gestor_cursos\node_modules\@prisma\client\runtime\library.js:121:6686)
    at Bn.request (C:\Users\desarrollador5\Documents\gestor_cursos\node_modules\@prisma\client\runtime\library.js:121:6393)
    at async l (C:\Users\desarrollador5\Documents\gestor_cursos\node_modules\@prisma\client\runtime\library.js:130:9645)
    at async NotasService.createNote (C:\Users\desarrollador5\Documents\gestor_cursos\src\notas\notas.service.ts:99:7)
    at async C:\Users\desarrollador5\Documents\gestor_cursos\node_modules\@nestjs\core\router\router-execution-context.js:46:28
    at async C:\Users\desarrollador5\Documents\gestor_cursos\node_modules\@nestjs\core\router\router-proxy.js:9:17 {
  code: 'P2010',
  clientVersion: '6.8.2',
  meta: { code: '207', message: "Invalid column name 'idNota'." }
}
[Nest] 12468  - 21/05/2025, 4:44:22 p. m.   ERROR [ExceptionsHandler] Error: No se pudo crear la nota:
Invalid `prisma.$executeRawUnsafe()` invocation:


Raw query failed. Code: `207`. Message: `Invalid column name 'idNota'.`
    at NotasService.createNote (C:\Users\desarrollador5\Documents\gestor_cursos\src\notas\notas.service.ts:108:11)
    at async C:\Users\desarrollador5\Documents\gestor_cursos\node_modules\@nestjs\core\router\router-execution-context.js:46:28
    at async C:\Users\desarrollador5\Documents\gestor_cursos\node_modules\@nestjs\core\router\router-proxy.js:9:17
