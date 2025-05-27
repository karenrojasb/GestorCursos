// create-auditorianotas.dto.ts
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateAuditoriaNotaDto {
  @IsNumber()
  @IsNotEmpty()
  idCurso: number;

  @IsNumber()
  @IsNotEmpty()
  idInscrito: number;

  @IsNumber()
  @IsNotEmpty()
  Nota: number;

  @IsNumber()
  @IsNotEmpty()
  idRegistro: number;
}




@Post()
@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
create(@Body() dto: CreateAuditoriaNotaDto) {
  return this.auditoriaNotasService.createAuditoria(dto);
}




async createAuditoria(dto: CreateAuditoriaNotaDto) {
  console.log('DTO recibido:', dto);

  try {
    if (
      dto.idCurso == null ||
      dto.idInscrito == null ||
      dto.Nota == null ||
      dto.idRegistro == null
    ) {
      throw new Error('Campos requeridos faltan en el DTO');
    }

    const notaExistente = await this.prisma.auditoriasNotas.findFirst({
      where: {
        idCurso: dto.idCurso,
        idInscrito: dto.idInscrito,
      },
    });

    if (notaExistente) {
      const nuevaNotaDiferente =
        dto.Nota !== notaExistente.Nota;

      if (nuevaNotaDiferente) {
        const notaActualizada = await this.prisma.auditoriasNotas.update({
          where: { id: notaExistente.id },
          data: {
            Nota: dto.Nota,
            idRegistro: dto.idRegistro,
            FechaRegistro: new Date().toISOString(),
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
        FechaRegistro: new Date().toISOString(),
      },
    });

    return nuevaNota;
  } catch (error) {
    console.error('Error al crear la auditoría de nota:', error);
    throw new Error(`No se pudo crear la auditoría de nota: ${error.message}`);
  }
}