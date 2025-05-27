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
    } else {
   
      const newNote = await this.prisma.notas.create({
        data: {
          idCurso: CreateAuditoriaNotaDto.idCurso,
          idInscrito: CreateAuditoriaNotaDto.idInscrito,
          Nota: CreateAuditoriaNotaDto.Nota,
          idRegistro: CreateAuditoriaNotaDto.idRegistro,
          FechaRegistro: new Date(),
        },
      });
      return newNote;
    }
  } catch (error) {
    console.error('Error al crear la nota:', error);
    throw new Error(`No se pudo crear la nota: ${error.message}`);
  }
}
}async createRegistration(data: CreateInscripcionDto) {
    const inscripcionExistente = await this.prisma.inscripciones.findFirst({
      where: {
        idCur: data.idCur,
        docInscr: data.docInscr,
      },
    });

    if (inscripcionExistente) {
      return this.prisma.inscripciones.update({
        where: { id: inscripcionExistente.id },
        data: { est: true },
      });
    }

    const curso = await this.prisma.cursos.findUnique({
      where: { id: data.idCur },
      select: { CupoMax: true },
    });

    if (!curso) {
      throw new NotFoundException('Curso no encontrado');
    }

    if (curso.CupoMax === null) {
      return this.prisma.inscripciones.create({
        data: {
          idCur: data.idCur,
          docInscr: data.docInscr,
          est: true,
          fecreg: new Date(),
        },
      });
    }

    const inscripcionesContadas = await this.prisma.inscripciones.count({
      where: { idCur: data.idCur },
    });

    if (inscripcionesContadas >= curso.CupoMax) {
      throw new Error('El cupo máximo del curso ha sido alcanzado');
    }

    return this.prisma.inscripciones.create({
      data: {
        idCur: data.idCur,
        docInscr: data.docInscr,
        est: true,
        fecreg: new Date(),
      },
    });
  }
