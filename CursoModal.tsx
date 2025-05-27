[Nest] 10192  - 27/05/2025, 9:39:26 a. m.   ERROR [ExceptionsHandler] PrismaClientKnownRequestError:
Invalid `prisma.$executeRawUnsafe()` invocation:


Raw query failed. Code: `207`. Message: `Invalid column name 'undefined'.`
    at Bn.handleRequestError (C:\Users\desarrollador5\Documents\gestor_cursos\node_modules\@prisma\client\runtime\library.js:121:7362)
    at Bn.handleAndLogRequestError (C:\Users\desarrollador5\Documents\gestor_cursos\node_modules\@prisma\client\runtime\library.js:121:6686)
    at Bn.request (C:\Users\desarrollador5\Documents\gestor_cursos\node_modules\@prisma\client\runtime\library.js:121:6393)
    at async l (C:\Users\desarrollador5\Documents\gestor_cursos\node_modules\@prisma\client\runtime\library.js:130:9645)
    at async AuditoriaNotasService.crearAuditoria (C:\Users\desarrollador5\Documents\gestor_cursos\src\auditorias_notas\auditorianotas.service.ts:11:12)
    at async C:\Users\desarrollador5\Documents\gestor_cursos\node_modules\@nestjs\core\router\router-execution-context.js:46:28
    at async C:\Users\desarrollador5\Documents\gestor_cursos\node_modules\@nestjs\core\router\router-proxy.js:9:17 {
  code: 'P2010',
  clientVersion: '6.8.2',
  meta: {
    code: '207',
    message: "Invalid column name 'undefined'."
  }
}
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateAuditoriaNotaDto } from './dto/create-auditoria-nota.dto';

@Injectable()
export class AuditoriasNotasService {
  constructor(private readonly prisma: PrismaService) {}

  async crearAuditoria(dto: CreateAuditoriaNotaDto) {
    // Inserta el registro en la tabla gescur.AuditoriasNotas
    return await this.prisma.$executeRawUnsafe(`
      INSERT INTO gescur.AuditoriasNotas (idInscrito, idCurso, Nota, idRegistro)
      VALUES (${dto.idInscrito}, ${dto.idCurso}, ${dto.nota}, ${dto.idRegistro})
    `);
  }
}
