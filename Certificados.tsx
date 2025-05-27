[Nest] 8900  - 27/05/2025, 2:52:27 p. m.   ERROR [ExceptionsHandler] Error: No se pudo crear la auditoría de nota:
Invalid `this.prisma.auditoriasNotas.create()` invocation in
C:\Users\desarrollador5\Documents\gestor_cursos\src\auditorias_notas\auditorianotas.service.ts:43:59

  40 }
  41
  42 // Si no existe, crea un nuevo registro
→ 43 const nuevaNota = await this.prisma.auditoriasNotas.create({
       data: {
         idInscrito: undefined,
         Nota: undefined,
         idRegistro: undefined,
         FechaRegistro: "2025-05-27T19:52:27.887Z",
     +   idCurso: Int
       }
     })

Argument `idCurso` is missing.
    at AuditoriaNotasService.createAuditoria (C:\Users\desarrollador5\Documents\gestor_cursos\src\auditorias_notas\auditorianotas.service.ts:57:13)
    at async C:\Users\desarrollador5\Documents\gestor_cursos\node_modules\@nestjs\core\router\router-execution-context.js:46:28
    at async C:\Users\desarrollador5\Documents\gestor_cursos\node_modules\@nestjs\core\router\router-proxy.js:9:17

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAuditoriaNotaDto } from './dto/create-auditorianotas.dto';

@Injectable()
export class AuditoriaNotasService {
  constructor(private prisma: PrismaService) {}

  async createAuditoria(dto: CreateAuditoriaNotaDto) {
    console.log('DTO recibido:', dto);

    try {
      // Verifica si ya existe un registro para ese idCurso + idInscrito
      const notaExistente = await this.prisma.auditoriasNotas.findFirst({
        where: {
          idCurso: dto.idCurso!,
          idInscrito: dto.idInscrito!,
        },
      });

      if (notaExistente) {
        const nuevaNotaDiferente =
          dto.Nota !== null &&
          dto.Nota !== undefined &&
          dto.Nota !== notaExistente.Nota;

        if (nuevaNotaDiferente) {
          const notaActualizada = await this.prisma.auditoriasNotas.update({
            where: { id: notaExistente.id },
            data: {
              Nota: dto.Nota!,
              idRegistro: dto.idRegistro!,
              FechaRegistro: new Date().toISOString(), // ← Fecha actual
            },
          });
          return notaActualizada;
        } else {
          return notaExistente; // No se actualiza si no hay cambios
        }
      }

      // Si no existe, crea un nuevo registro
      const nuevaNota = await this.prisma.auditoriasNotas.create({
        data: {
          idCurso: dto.idCurso!,
          idInscrito: dto.idInscrito!,
          Nota: dto.Nota!,
          idRegistro: dto.idRegistro!,
          FechaRegistro: new Date().toISOString(),
        },
      });

      return nuevaNota;

    } catch (error) {
      console.error('Error al crear la auditoría de nota:', error);
      throw new Error(`No se pudo crear la auditoría de nota: ${error.message}`);
    }
  }
}
