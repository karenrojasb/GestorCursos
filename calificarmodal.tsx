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
async findByCursoAndInscrito(idCurso: number, idInscrito: number) {
  return this.prisma.notas.findFirst({
    where: {
      idCurso,
      idInscrito,
    },
  });
}

}



import { useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";

interface CalificarModalProps {
  nombre: string;
  documento: number;
  idCur: number;
  onClose: () => void;
  onGuardar: (nota: string) => void;
}

interface OpcionLista {
  id: number;
  Especificacion: string;
}

export default function CalificarModal({
  nombre,
  documento,
  idCur,
  onClose,
  onGuardar,
}: CalificarModalProps) {
  const [opciones, setOpciones] = useState<OpcionLista[]>([]);
  const [notaSeleccionada, setNotaSeleccionada] = useState<number | null>(null);
  const [idEmp, setIdEmp] = useState<string | null>(null);
  const [guardando, setGuardando] = useState(false);
  const [notaExistenteId, setNotaExistenteId] = useState<number | null>(null); // NUEVO

  useEffect(() => {
    const storedId = localStorage.getItem("id_emp");
    setIdEmp(storedId);
  }, []);

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const respOpciones = await fetch("http://localhost:8090/api/listas/Especificaciones");
        if (!respOpciones.ok) throw new Error("Error al obtener lista de notas");
        const dataOpciones = await respOpciones.json();
        setOpciones(dataOpciones);

        const respNota = await fetch(`http://localhost:8090/api/notas/curso-inscrito?idCurso=${idCur}&idInscrito=${documento}`);
        if (respNota.ok) {
          const dataNota = await respNota.json();
          if (dataNota && dataNota.Nota !== undefined) {
            setNotaSeleccionada(Number(dataNota.Nota));
            setNotaExistenteId(dataNota.id); // Guarda el id para actualizar
          }
        }
      } catch (error) {
        console.error("Error cargando datos:", error);
      }
    };

    if (idCur && documento) {
      fetchDatos();
    }
  }, [idCur, documento]);


  const handleGuardar = async () => {
    if (notaSeleccionada === null || isNaN(notaSeleccionada)) {
      alert("Por favor selecciona una nota válida");
      return;
    }
  
    if (!idEmp) {
      alert("Error: ID de empleado no encontrado.");
      return;
    }
  
    setGuardando(true);
  
    try {
      // Paso 1: Consultar si ya existe nota
      const responseGet = await fetch(
        `http://localhost:8090/api/notas/curso-inscrito?idCurso=${idCur}&idInscrito=${documento}`
      );
  
      if (!responseGet.ok) {
        throw new Error("Error al verificar existencia de nota.");
      }
  
      const notaExistente = await responseGet.json();
  
      if (notaExistente && notaExistente.id) {
        // Paso 2: Si existe, actualizar
        const responsePut = await fetch(`http://localhost:8090/api/notas/${notaExistente.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Nota: notaSeleccionada,
            idRegistro: Number(idEmp),
            FechaRegistro: new Date(),
          }),
        });
  
        if (!responsePut.ok) {
          throw new Error("Error al actualizar la nota.");
        }
      } else {
        // Paso 3: Si no existe, crear
        const responsePost = await fetch("http://localhost:8090/api/notas", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idCurso: idCur,
            idInscrito: documento,
            idRegistro: Number(idEmp),
            Nota: notaSeleccionada,
            FechaRegistro: new Date(),
          }),
        });
  
        if (!responsePost.ok) {
          throw new Error("Error al crear la nota.");
        }
      }
  
      onGuardar(String(notaSeleccionada));
      onClose();
    } catch (error) {
      console.error("Error al guardar nota:", error);
      alert("Hubo un error al guardar la nota.");
    } finally {
      setGuardando(false);
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-[400px] relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-[#990000] transition-transform duration-300 transform hover:rotate-90 hover:scale-110"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
        <h2 className="text-2xl font-semibold text-[#990000] mb-4 text-center">Calificar</h2>

        <p className="text-center mb-2"><strong>Id Curso:</strong> {idCur}</p>
        <p className="text-center mb-2"><strong>Nombre:</strong> {nombre}</p>
        <p className="text-center mb-2"><strong>Documento:</strong> {documento}</p>
        <p className="text-center mb-4"><strong>Empleado actual:</strong> {idEmp ?? "No disponible"}</p>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Selecciona una calificación:
          </label>
          <select
            className="w-full border rounded px-3 py-2"
            value={notaSeleccionada ?? ""}
            onChange={(e) => setNotaSeleccionada(Number(e.target.value))}
          >
            <option value="">-- Selecciona --</option>
            {opciones.map((op) => (
              <option key={op.id} value={op.id}>
                {op.Especificacion}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={handleGuardar}
            disabled={guardando}
            className="bg-[#990000] text-white px-4 py-2 rounded hover:bg-red-700 transition hover:scale-110 active:scale-95"
          >
            {guardando ? "Guardando..." : "Guardar"}
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition hover:scale-110 active:scale-95"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
