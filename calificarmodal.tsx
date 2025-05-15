import { Injectable } from '@nestjs/common';
import { CreateNotaDto } from './dto/create-nota.dto';
import { UpdateNotaDto } from './dto/update-nota.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class NotasService {
  updateNote(arg0: number, UpdateNotaDto: UpdateNotaDto) {
    throw new Error('Method not implemented.');
  }
  constructor(private readonly prisma: PrismaService) {}

//  OBTENER TODAS LAS NOTAS

async findAll() {
  const notas = await this.prisma.notas.findMany({
    include: {
      Listas: {
        select: {
          Especificacion: true,
        },
      },
    },
  });

  const notasConInscrito = await Promise.all(notas.map(async (nota) => {
    const inscrito = await this.prisma.inscripciones.findFirst({
      where: {
        docInscr: nota.idInscrito,
      },
      select: {
        
        docInscr: true,
      },
    });

    return {
      ...nota,
      inscrito: inscrito || null,
    };
  }));

  return notasConInscrito;
}


// MÉTODO PARA CREAR NOTA
async createNote(CreateNotaDto: CreateNotaDto) {
  console.log('DTO recibido:', CreateNotaDto); // <--- esto es importante

  try {
    const newNote = await this.prisma.notas.create({
      data: {
        idCurso: CreateNotaDto.idCurso,
        idInscrito: CreateNotaDto.idInscrito,
        Nota: CreateNotaDto.Nota,
        idRegistro: CreateNotaDto.idRegistro,
        FechaRegistro: new Date(),
      },
    });
    return newNote;
  } catch (error) {
    console.error('Error al crear la nota:', error);
    throw new Error(`No se pudo crear la nota: ${error.message}`);
  }
}



    // OBTENER NOTA POR ID INSCRITO 
    async getWrittenNote(idInscrito: number) {
      const notas = await this.prisma.notas.findMany({
        where: { idInscrito },
        include: {
          Listas: {
            select: {
              Especificacion: true,
            },
          },
        },
      });
    
      const notasConCurso = await Promise.all(
        notas.map(async (nota) => {
          if (!nota.idCurso) {
            return {
              ...nota,
              idCurso: null,
              NombreCurso: null,
              Lugar: null,
              Inicio: null,
              Fin: null,
              LunesIni: null,
              LunesFin: null,
              MartesIni: null,
              MartesFin: null,
              MiercolesIni: null,
              MiercolesFin: null,
              JuevesIni: null,
              JuevesFin: null,
              ViernesIni: null,
              ViernesFin: null,
              SabadoIni: null,
              SabadoFin: null,
              Profesor: null,
              Proexterno: null,
              SegundoPro: null,
              ProfesorNombre: null,
              SegundoProNombre: null,
            };
          }
    
          const curso = await this.prisma.cursos.findFirst({
            where: {
              id: nota.idCurso,
            },
            select: {
              NombreCurso: true,
              Lugar: true,
              Inicio: true,
              Fin: true,
              LunesIni: true,
              LunesFin: true,
              MartesIni: true,
              MartesFin: true,
              MiercolesIni: true,
              MiercolesFin: true,
              JuevesIni: true,
              JuevesFin: true,
              ViernesIni: true,
              ViernesFin: true,
              SabadoIni: true,
              SabadoFin: true,
              Profesor: true,
              SegundoPro: true,
              Proexterno: true,
            },
          });
    
          const profesorId = curso?.Profesor?.toString() || '0';
          const segundoProId = curso?.SegundoPro?.toString() || '0';
    
          const [profesor] = await this.prisma.$queryRaw<
            { nombre: string }[]
          >`SELECT nombre FROM gescur.emp_nomina WHERE id_emp = CAST(${profesorId} AS VARCHAR)`;
    
          const [segundoPro] = await this.prisma.$queryRaw<
            { nombre: string }[]
          >`SELECT nombre FROM gescur.emp_nomina WHERE id_emp = CAST(${segundoProId} AS VARCHAR)`;
    
          return {
            ...nota,
            NombreCurso: curso?.NombreCurso || null,
            Lugar: curso?.Lugar || null,
            Inicio: curso?.Inicio || null,
            Fin: curso?.Fin || null,
            LunesIni: curso?.LunesIni || null,
            LunesFin: curso?.LunesFin || null,
            MartesIni: curso?.MartesIni || null,
            MartesFin: curso?.MartesFin || null,
            MiercolesIni: curso?.MiercolesIni || null,
            MiercolesFin: curso?.MiercolesFin || null,
            JuevesIni: curso?.JuevesIni || null,
            JuevesFin: curso?.JuevesFin || null,
            ViernesIni: curso?.ViernesIni || null,
            ViernesFin: curso?.ViernesFin || null,
            SabadoIni: curso?.SabadoIni || null,
            SabadoFin: curso?.SabadoFin || null,
            ProExterno: curso?.Proexterno || null,
            Profesor: curso?.Profesor || null,
            SegundoPro: curso?.SegundoPro || null,
            ProfesorNombre: profesor?.nombre ?? null,
            SegundoProNombre: segundoPro?.nombre ?? null,
          };
        })
      );
    
      return notasConCurso;
    }

    
// OBTENER NOTAS APROVADAS POR IDINSCRITO 
async getAprovado(idInscrito: number | string) {
  const idInscritoInt = Number(idInscrito);
  if (isNaN(idInscritoInt)) {
    throw new Error('El ID del inscrito debe ser un número válido');
  }

  const notas = await this.prisma.notas.findMany({
    where: {
      idInscrito: idInscritoInt,
      Nota: 33,
    },
    include: {
      Listas: {
        select: {
          Especificacion: true,
        },
      },
    },
  });

  const notasConCurso = await Promise.all(
    notas.map(async (nota) => {
      if (!nota.idCurso) {
        return {
          ...nota,
          NombreCurso: null,
          Lugar: null,
          Inicio: null,
          Fin: null,
          LunesIni: null,
          LunesFin: null,
          MartesIni: null,
          MartesFin: null,
          MiercolesIni: null,
          MiercolesFin: null,
          JuevesIni: null,
          JuevesFin: null,
          ViernesIni: null,
          ViernesFin: null,
          SabadoIni: null,
          SabadoFin: null,
          Profesor: null,
          Proexterno: null,
          SegundoPro: null,
          ProfesorNombre: null,
          SegundoProNombre: null,
        };
      }

      const curso = await this.prisma.cursos.findFirst({
        where: {
          
          id: nota.idCurso,
        },
        select: {
          NombreCurso: true,
          Lugar: true,
          Inicio: true,
          Fin: true,
          LunesIni: true,
          LunesFin: true,
          MartesIni: true,
          MartesFin: true,
          MiercolesIni: true,
          MiercolesFin: true,
          JuevesIni: true,
          JuevesFin: true,
          ViernesIni: true,
          ViernesFin: true,
          SabadoIni: true,
          SabadoFin: true,
          Profesor: true,
          SegundoPro: true,
          Proexterno: true,
        },
      });

      const profesorId = curso?.Profesor?.toString() || '0';
      const segundoProId = curso?.SegundoPro?.toString() || '0';

      const [profesor] = await this.prisma.$queryRaw<
        { nombre: string }[]
      >`SELECT nombre FROM gescur.emp_nomina WHERE id_emp = CAST(${profesorId} AS VARCHAR)`;

      const [segundoPro] = await this.prisma.$queryRaw<
        { nombre: string }[]
      >`SELECT nombre FROM gescur.emp_nomina WHERE id_emp = CAST(${segundoProId} AS VARCHAR)`;

      return {
        ...nota,
        NombreCurso: curso?.NombreCurso || null,
        Lugar: curso?.Lugar || null,
        Inicio: curso?.Inicio || null,
        Fin: curso?.Fin || null,
        LunesIni: curso?.LunesIni || null,
        LunesFin: curso?.LunesFin || null,
        MartesIni: curso?.MartesIni || null,
        MartesFin: curso?.MartesFin || null,
        MiercolesIni: curso?.MiercolesIni || null,
        MiercolesFin: curso?.MiercolesFin || null,
        JuevesIni: curso?.JuevesIni || null,
        JuevesFin: curso?.JuevesFin || null,
        ViernesIni: curso?.ViernesIni || null,
        ViernesFin: curso?.ViernesFin || null,
        SabadoIni: curso?.SabadoIni || null,
        SabadoFin: curso?.SabadoFin || null,
        ProExterno: curso?.Proexterno || null,
        Profesor: curso?.Profesor || null,
        SegundoPro: curso?.SegundoPro || null,
        ProfesorNombre: profesor?.nombre ?? null,
        SegundoProNombre: segundoPro?.nombre ?? null,
      };
    }),
  );

  return notasConCurso;
}


    // MÉTODO PARA ACTUALIZAR
    async UpdateNote (id: number, data: Prisma.NotasUpdateInput){
      console.log ('id received:', id);
      console.log ('data received:', data);

      try {
        const UpdateNote = await this.prisma.notas.update({
          where: {id},
          data,
        });
        console.log ('update note:', UpdateNote);
        return UpdateNote;
      }
      catch (error){
        console.error ('error when updating note:', error);
        throw new error('the note was not updated');
      }
    }

    // MÉTODO PARA ELIMINAR
    async deleteNote(id:number){
      return this.prisma.notas.delete({where: {id}});
    }

    // Obtener una nota por idCurso e idInscrito


}
