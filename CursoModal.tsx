async getRegistrationsByCourseId(idCur: number) {
  return this.prisma.$queryRawUnsafe<
    Array<{
      id: number;
      idCur: number;
      docInscr: string;
      est: boolean;
      fecreg: Date;
      notaId: number | null;
      nota: number | null;
      idRegistro: number | null;
      fechaRegistro: Date | null;
    }>
  >(
    `SELECT 
      i.id, 
      i.idCur, 
      i.docInscr, 
      i.est, 
      i.fecreg,
      n.id AS notaId,
      n.Nota AS nota,
      n.idRegistro,
      n.FechaRegistro AS fechaRegistro
    FROM gescur.Inscripciones i
    LEFT JOIN gescur.Notas n
      ON i.idCur = n.idCurso AND i.docInscr = n.idInscrito
    WHERE i.est = 1 AND i.idCur = ${idCur}`
  );
}
