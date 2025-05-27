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