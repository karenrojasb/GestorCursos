[Nest] 18076  - 26/05/2025, 11:29:31 a. m.   ERROR [ExceptionsHandler] PrismaClientValidationError: 
Invalid `this.prisma.notas.findFirst()` invocation in
C:\Users\desarrollador5\Documents\gestor_cursos\src\notas\notas.service.ts:359:28

  356
  357 // Obtener una nota por idCurso e idInscrito con Especificación
  358 async findByCursoAndInscrito(idCurso: number, idInscrito: number) {
→ 359   return this.prisma.notas.findFirst({
          where: {
            idCurso: "455",
                     ~~~~~
            idInscrito: "1000034366"
          },
          include: {
            Listas: {
              select: {
                Especificacion: true
              }
            }
          }
        })

Argument `idCurso`: Invalid value provided. Expected IntNullableFilter, Int or Null, provided String.
    at xn (C:\Users\desarrollador5\Documents\gestor_cursos\node_modules\@prisma\client\runtime\library.js:29:1363)
    at Bn.handleRequestError (C:\Users\desarrollador5\Documents\gestor_cursos\node_modules\@prisma\client\runtime\library.js:121:7005)
    at Bn.handleAndLogRequestError (C:\Users\desarrollador5\Documents\gestor_cursos\node_modules\@prisma\client\runtime\library.js:121:6686)
    at Bn.request (C:\Users\desarrollador5\Documents\gestor_cursos\node_modules\@prisma\client\runtime\library.js:121:6393)
    at async l (C:\Users\desarrollador5\Documents\gestor_cursos\node_modules\@prisma\client\runtime\library.js:130:9645)
    at async C:\Users\desarrollador5\Documents\gestor_cursos\node_modules\@nestjs\core\router\router-execution-context.js:46:28
    at async C:\Users\desarrollador5\Documents\gestor_cursos\node_modules\@nestjs\core\router\router-proxy.js:9:17 {
  clientVersion: '6.8.2'
}
