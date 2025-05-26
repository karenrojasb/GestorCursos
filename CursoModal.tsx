id, idCur,fecreg, docInscr


async getRegistrationsByCourseId(idCur: number) {
  return this.prisma.$queryRawUnsafe<
    Array<{
      id: number;
      idCur: number;
      docInscr: string;
      est: boolean;
      fecreg: Date;
    }>
  >(
    `SELECT 
      i.id, 
      i.idCur, 
      i.docInscr, 
      i.est, 
      i.fecreg
    FROM gescur.Inscripciones i
    WHERE i.est = 1 AND i.idCur = ${idCur}`
  );
}



