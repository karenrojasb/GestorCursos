import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateInscripcionDto } from './dto/create-inscripciones.dto';
import { UpdateInscripcionDto } from './dto/update-inscripciones.dto';

@Injectable()
export class InscripcionesService {
  constructor(private readonly prisma: PrismaService) {}

  async crearInscripcion(data: CreateInscripcionDto) {
    // Buscar si ya existe una inscripción con el mismo curso e id de usuario
    const inscripcionExistente = await this.prisma.inscripciones.findFirst({
      where: {
        idCur: data.idCur,
        docInscr: data.docInscr,
      },
    });

    if (inscripcionExistente) {
      // Si la inscripción ya existe, actualizar estado a `true`
      return this.prisma.inscripciones.update({
        where: { id: inscripcionExistente.id },
        data: { est: true },
      });
    }

    // Si no existe, crear nueva inscripción
    return this.prisma.inscripciones.create({
      data: {
        idCur: data.idCur,
        docInscr: data.docInscr,
        est: true, // Estado siempre inicia en `true`
        fecreg: new Date(),
      },
    });
  }

  async getInscripciones() {
    return this.prisma.$queryRawUnsafe<
      Array<{
        id: number;
        idCur: number;
        NombreCurso: string;
        docInscr: string;
        nombre: string | null;
        est: boolean;
        fecreg: Date;
        Profesor: number;
        SegundoPro: number; 
        
      }>
    >(
      `SELECT 
        i.id, 
        i.idCur, 
        c.NombreCurso, 
        i.docInscr, 
        e.nombre, 
        i.est, 
        i.fecreg,
        c.Profesor,
        c.SegundoPro

      FROM gescur.Inscripciones i
      LEFT JOIN gescur.Cursos c ON i.idCur = c.id
      LEFT JOIN gescur.emp_nomina e ON i.docInscr = e.id_emp`
    );
  }



  async getCursosPorProfesor(idProfesor: number) {
    return this.prisma.$queryRawUnsafe<
      Array<{
        id: number;
        idCur: number;
        NombreCurso: string;
        Profesor: number;
        SegundoPro: number;
        Lugar: string;
        Inicio: Date;
        Fin: Date;
        docInscr: string;
        nombre: string | null;
        fecreg: Date;
        rol: string; // 'Titular' o 'Segundo'
      }>
    >(
      `SELECT 
        i.id,
        i.idCur,
        c.NombreCurso,
        c.Profesor,
        c.SegundoPro,
        c.Lugar,
        c.Inicio,
        c.Fin,
        i.docInscr,
        e.nombre,
        i.fecreg,
        CASE 
          WHEN c.Profesor = ${idProfesor} THEN 'Titular'
          WHEN c.SegundoPro = ${idProfesor} THEN 'Segundo'
          ELSE 'Otro'
        END AS rol
      FROM gescur.Cursos c
      LEFT JOIN gescur.Inscripciones i ON i.idCur = c.id
      LEFT JOIN gescur.emp_nomina e ON i.docInscr = e.id_emp
      WHERE c.Profesor = ${idProfesor} OR c.SegundoPro = ${idProfesor}`
    );
  }
  
  

  async obtenerPorId(id: number) {
    const inscripcion = await this.prisma.inscripciones.findUnique({ where: { id } });
    if (!inscripcion) throw new NotFoundException('Inscripción no encontrada');
    return inscripcion;
  }

  async actualizarEstado(id: number, dto: UpdateInscripcionDto) {
    return this.prisma.inscripciones.update({
      where: { id },
      data: { est: Boolean(dto.est) }, 
    });
  }

  async eliminarInscripcion(id: number) {
    return this.prisma.inscripciones.delete({ where: { id } });
  }
}

