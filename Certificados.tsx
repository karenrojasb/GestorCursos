import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAuditoriaNotaDto } from './dto/create-auditorianotas.dto';

@Injectable()
export class AuditoriaNotasService {
  constructor(private prisma: PrismaService) {}

  async createAuditoria(dto: CreateAuditoriaNotaDto) {
    console.log('DTO recibido:', dto);

    try {
      const notaExistente = await this.prisma.auditoriasNotas.findFirst({
        where: {
          idCurso: dto.idCurso,
          idInscrito: dto.idInscrito,
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
              Nota: dto.Nota,
              idRegistro: dto.idRegistro,
              FechaRegistro: new Date(), // Actualiza la fecha también
            },
          });
          return notaActualizada;
        } else {
          return notaExistente;
        }
      }

      // 👉 Si no existe, crea una nueva
      const nuevaNota = await this.prisma.auditoriasNotas.create({
        data: {
          idCurso: dto.idCurso,
          idInscrito: dto.idInscrito,
          Nota: dto.Nota,
          idRegistro: dto.idRegistro,
          FechaRegistro: new Date(), // Fecha actual al momento de crear
        },
      });

      return nuevaNota;

    } catch (error) {
      console.error('Error al crear la nota:', error);
      throw new Error(`No se pudo crear la nota: ${error.message}`);
    }
  }
}