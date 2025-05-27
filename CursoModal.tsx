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