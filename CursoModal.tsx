async getCursosConInscritos() {
  try {
    const resultado = await this.prisma.$queryRaw`
      SELECT 
        n.id,
        n.IdCurso,
        c.NombreCurso,          
        n.IdInscrito,
        n.Nota,
        n.idRegistro,
        n.FechaRegistro,
        i.fecreg
      FROM gescur."Notas" n
      LEFT JOIN gescur.cursos c ON n.IdCurso = c.id
      LEFT JOIN gescur.Inscripciones i ON n.IdInscrito = i.docInscr
    `;

    return resultado;
  } catch (error) {
    console.error("Error al obtener cursos con inscritos:", error.message);
    throw new Error("No se pudo obtener la lista de cursos con inscritos.");
  }
}
