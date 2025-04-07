[Nest] 16380  - 07/04/2025, 4:43:37 p. m.   ERROR [ExceptionsHandler] PrismaClientKnownRequestError: 
Invalid `prisma.$queryRawUnsafe()` invocation:


Raw query failed. Code: `102`. Message: `Incorrect syntax near '.'.`
    at Bn.handleRequestError (C:\Users\desarrollador5\Documents\gestor_cursos\node_modules\@prisma\client\runtime\library.js:121:7362)
    at Bn.handleAndLogRequestError (C:\Users\desarrollador5\Documents\gestor_cursos\node_modules\@prisma\client\runtime\library.js:121:6686)
    at Bn.request (C:\Users\desarrollador5\Documents\gestor_cursos\node_modules\@prisma\client\runtime\library.js:121:6393)
    at async l (C:\Users\desarrollador5\Documents\gestor_cursos\node_modules\@prisma\client\runtime\library.js:130:9645)
    at async C:\Users\desarrollador5\Documents\gestor_cursos\node_modules\@nestjs\core\router\router-execution-context.js:46:28
    at async C:\Users\desarrollador5\Documents\gestor_cursos\node_modules\@nestjs\core\router\router-proxy.js:9:17 {
  code: 'P2010',
  clientVersion: '6.3.1',
  meta: {
    code: '102',
    message: "Incorrect syntax near '.'."
  }
}

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
        calificacion: boolean
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
        i.calificacion

      FROM gescur.Inscripciones i
      LEFT JOIN gescur.Cursos c ON i.idCur = c.id
      LEFT JOIN gescur.emp_nomina e ON i.docInscr = e.id_emp`
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


