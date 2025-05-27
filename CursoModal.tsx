import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateAuditoriaNotaDto } from './dto/create-auditoria-nota.dto';

@Injectable()
export class AuditoriasNotasService {
  constructor(private readonly prisma: PrismaService) {}

  async crearAuditoria(dto: CreateAuditoriaNotaDto) {
    return await this.prisma.$executeRawUnsafe(`
      INSERT INTO gescur.AuditoriasNotas (idInscrito, idCurso, Nota, idRegistro)
      VALUES (${dto.idInscrito}, ${dto.idCurso}, ${dto.nota}, ${dto.idRegistro})
    `);
  }
}





import { Controller, Post, Body } from '@nestjs/common';
import { AuditoriasNotasService } from './auditorias-notas.service';
import { CreateAuditoriaNotaDto } from './dto/create-auditoria-nota.dto';

@Controller('auditorias-notas')
export class AuditoriasNotasController {
  constructor(private readonly auditoriasNotasService: AuditoriasNotasService) {}

  @Post()
  async crearAuditoria(@Body() dto: CreateAuditoriaNotaDto) {
    return await this.auditoriasNotasService.crearAuditoria(dto);
  }
}





const nuevaNota = await this.prisma.notas.create({
  data: {
    idInscrito: dto.idInscrito,
    idCurso: dto.idCurso,
    Nota: dto.nota,
    // otros campos
  },
});

// Crear auditoría
await this.auditoriasNotasService.crearAuditoria({
  idInscrito: dto.idInscrito,
  idCurso: dto.idCurso,
  nota: dto.nota,
  idRegistro: nuevaNota.id, // el ID de la nota recién creada
});