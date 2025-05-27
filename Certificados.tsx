import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAuditoriaNotaDto } from './dto/create-auditorianotas.dto';

@Injectable()
export class AuditoriaNotasService {
  constructor(private prisma: PrismaService) {}

  async createAuditoria(dto: CreateAuditoriaNotaDto) {
    console.log('DTO recibido:', dto);

    try {
      // Validación mínima de campos requeridos
      if (
        dto.idCurso == null ||
        dto.idInscrito == null ||
        dto.Nota == null ||
        dto.idRegistro == null
      ) {
        throw new Error('Campos requeridos faltan en el DTO');
      }

      // Siempre crea un nuevo registro
      const nuevaNota = await this.prisma.auditoriasNotas.create({
        data: {
          idCurso: dto.idCurso,
          idInscrito: dto.idInscrito,
          Nota: dto.Nota,
          idRegistro: dto.idRegistro,
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