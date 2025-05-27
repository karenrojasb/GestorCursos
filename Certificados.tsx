import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // o el nombre que tengas
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

    
      const nuevaNota = await this.prisma.auditoriasNotas.create({
        data: {
          idCurso: dto.idCurso,
          idInscrito: dto.idInscrito,
          Nota: dto.Nota,
          idRegistro: dto.idRegistro,
          FechaRegistro: new Date(), 
        },
      });

      return nuevaNota;

    } catch (error) {
      console.error('Error al crear la nota:', error);
      throw new Error(`No se pudo crear la nota: ${error.message}`);
    }
  }
}
