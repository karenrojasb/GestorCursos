async findAllConEspecificacion() {
  return this.prisma.$queryRawUnsafe<
    Array<{
      id: number;
      idCurso: number;
      idInscrito: number;
      Nota: number;
      especificacion: string;
    }>
  >(
    `SELECT 
      n.id,
      n.idCurso,
      n.idInscrito,
      n.Nota,
      l.Especificacion
    FROM gescur.Notas n
    LEFT JOIN gescur.Listas l ON n.Nota = l.numero`
  );
}