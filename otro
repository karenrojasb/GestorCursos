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
  async findAll(){
    return this.prisma.notas.findMany();
  }

  //  MÉTODO PARA CREAR NOTA
    async createNote(CreateNotaDto: CreateNotaDto) {
      const newNote = await this.prisma.notas.create({
        data: {
          idCurso: CreateNotaDto.idCurso,
          idInscrito: CreateNotaDto.idInscrito,
          Nota: CreateNotaDto.Nota,
          // FechaRegistro: CreateNotaDto.FechaRegistro  
        },
      });
      return newNote;
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

}
