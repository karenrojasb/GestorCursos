import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // o el nombre que tengas
import { CreateAuditoriaNotaDto } from './dto/create-auditorianotas.dto';

@Injectable()
export class AuditoriaNotasService {
  constructor(private prisma: PrismaService) {}

  async crearAuditoria(dto: CreateAuditoriaNotaDto) {
   
    return await this.prisma.$executeRawUnsafe(`
      INSERT INTO gescur.AuditoriasNotas (idInscrito, idCurso, Nota, idRegistro)
      VALUES (${dto.idInscrito}, ${dto.idCurso}, ${dto.Nota}, ${dto.idRegistro})
    `);
  }
}

import { Controller, Post, Body } from '@nestjs/common';
import { AuditoriaNotasService } from './auditorianotas.service';
import { CreateAuditoriaNotaDto } from './dto/create-auditorianotas.dto';

@Controller('AuditoriaNotas')
export class AuditoriaNotasController {
  constructor(private readonly auditoriaNotasService: AuditoriaNotasService) {}

  @Post()
  create(@Body() dto: CreateAuditoriaNotaDto) {
    return this.auditoriaNotasService.crearAuditoria(dto);
  }
}
export class CreateAuditoriaNotaDto {

    idCurso: number;
    idInscrito: number;
    Nota: number;
    idRegistro: number;
    
}
