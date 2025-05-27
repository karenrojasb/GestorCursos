import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // o el nombre que tengas
import { CreateAuditoriaNotaDto } from './dto/create-auditoria-nota.dto';

@Injectable()
export class AuditoriaNotasService {
  constructor(private prisma: PrismaService) {}

  async crearAuditoria(createAuditoriaDto: CreateAuditoriaNotaDto) {
    return await this.prisma.$executeRawUnsafe(`
      INSERT INTO gescur.auditoria_notas (idNota, idInscrito, nota, usuario, fecha)
      VALUES (${createAuditoriaDto.idNota}, ${createAuditoriaDto.idInscrito}, ${createAuditoriaDto.nota}, '${createAuditoriaDto.usuario}', GETDATE())
    `);
  }
}





import { Controller, Post, Body } from '@nestjs/common';
import { AuditoriaNotasService } from './auditoria-notas.service';
import { CreateAuditoriaNotaDto } from './dto/create-auditoria-nota.dto';

@Controller('auditoria-notas')
export class AuditoriaNotasController {
  constructor(private readonly auditoriaNotasService: AuditoriaNotasService) {}

  @Post()
  create(@Body() dto: CreateAuditoriaNotaDto) {
    return this.auditoriaNotasService.crearAuditoria(dto);
  }
}




import { Module } from '@nestjs/common';
import { AuditoriaNotasService } from './auditoria-notas.service';
import { AuditoriaNotasController } from './auditoria-notas.controller';

@Module({
  controllers: [AuditoriaNotasController],
  providers: [AuditoriaNotasService],
  exports: [AuditoriaNotasService] // para poder llamarlo desde otros módulos
})
export class AuditoriaNotasModule {}