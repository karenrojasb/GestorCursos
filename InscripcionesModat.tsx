import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client'; // Importamos Prisma para consultas SQL crudas
import { CreateInscripcionDto } from './dto/create-inscripciones.dto';
import { UpdateInscripcionDto } from './dto/update-inscripciones.dto';

@Injectable()
export class InscripcionesService {
  constructor(private readonly prisma: PrismaService) {}

  async crearInscripcion(data: CreateInscripcionDto) {
    return this.prisma.inscripciones.create({
      data: {
        idCur: data.idCur,
        docInscr: data.docInscr,
        est: data.est, 
        fecreg: new Date(), 
      },
    });
  }

  async getInscripciones() {
    // Consulta SQL cruda usando parámetros seguros
    const inscripciones = await this.prisma.$queryRawUnsafe<
      Array<{
        id: number;
        idCur: number;
        NombreCurso: string;
        docInscr: string;
        nombre: string | null; // Puede ser null si el empleado no existe
        est: number;
        fecreg: Date;
      }>
    >(
      `SELECT 
        i.id, 
        i.idCur, 
        c.NombreCurso, 
        i.docInscr, 
        e.nombre, 
        i.est, 
        i.fecreg
      FROM gescur.Inscripciones i
      LEFT JOIN gescur.Cursos c ON i.idCur = c.id
      LEFT JOIN gescur.emp_nomina e ON i.docInscr = e.id_emp`
    );

    return inscripciones;
  }

  async obtenerPorId(id: number) {
    const inscripcion = await this.prisma.inscripciones.findUnique({ where: { id } });
    if (!inscripcion) throw new NotFoundException('Inscripción no encontrada');
    return inscripcion;
  }

  async actualizarEstado(id: number, dto: UpdateInscripcionDto) {
    return this.prisma.inscripciones.update({
      where: { id },
      data: { est: Boolean(dto.est) }, // Aseguramos que est sea booleano
    });
  }

  async eliminarInscripcion(id: number) {
    return this.prisma.inscripciones.delete({ where: { id } });
  }
}
