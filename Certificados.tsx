Type 'number | undefined' is not assignable to type 'number'.
  Type 'undefined' is not assignable to type 'number'.ts(2322)
index.d.ts(10151, 5): The expected type comes from property 'idInscrito' which is declared here on type '(Without<AuditoriasNotasCreateInput, AuditoriasNotasUncheckedCreateInput> & AuditoriasNotasUncheckedCreateInput) | (Without<...> & AuditoriasNotasCreateInput)'
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
              FechaRegistro: new Date(), // Actualiza fecha de modificación
            },
          });
          return notaActualizada;
        } else {
          return notaExistente; // No hay cambios en la nota
        }
      }

      // Si no existe, crea nueva
      const nuevaNota = await this.prisma.auditoriasNotas.create({
        data: {
          idCurso: dto.idCurso,
          idInscrito: dto.idInscrito,
          Nota: dto.Nota,
          idRegistro: dto.idRegistro,
          FechaRegistro: new Date(), // Fecha de creación automática
        },
      });

      return nuevaNota;

    } catch (error) {
      console.error('Error al crear la auditoría de nota:', error);
      throw new Error(`No se pudo crear la auditoría de nota: ${error.message}`);
    }
  }
}
