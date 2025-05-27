import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // o el nombre que tengas
import { CreateAuditoriaNotaDto } from './dto/create-auditorianotas.dto';

@Injectable()
export class AuditoriaNotasService {
  constructor(private prisma: PrismaService) {}

async createAuditoria(CreateAuditoriaNotaDto: CreateAuditoriaNotaDto) {
  console.log('DTO recibido:', CreateAuditoriaNotaDto);

  try {
    
    const notaExistente = await this.prisma.auditoriasNotas.findFirst({
      where: {
        idCurso: CreateAuditoriaNotaDto.idCurso,
        idInscrito: CreateAuditoriaNotaDto.idInscrito,
      },
    });

    if (notaExistente) {
   

      const nuevaNotaMasCompleta =
        CreateAuditoriaNotaDto.Nota !== null &&
        CreateAuditoriaNotaDto.Nota !== undefined &&
       CreateAuditoriaNotaDto.Nota !== notaExistente.Nota;

      if (nuevaNotaMasCompleta) {
        const notaActualizada = await this.prisma.auditoriasNotas.update({
          where: { id: notaExistente.id },
          data: {
            Nota: CreateAuditoriaNotaDto
            .Nota,
            idRegistro: CreateAuditoriaNotaDto.idRegistro,
            
          },
        });
        return notaActualizada;
      } else {
      
        return notaExistente;
      }
    }
  } catch (error) {
    console.error('Error al crear la nota:', error);
    throw new Error(`No se pudo crear la nota: ${error.message}`);
  }
}
}
