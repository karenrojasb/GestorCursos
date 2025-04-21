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

  // Verificar si ya hay suficientes inscripciones en el curso para el público
  const inscripcionesPorCurso = await this.prisma.inscripciones.count({
    where: {
      idCur: data.idCur,
      est: true, // Solo contar inscripciones activas
    },
  });

  const curso = await this.prisma.cursos.findUnique({
    where: { id: data.idCur },
    select: { cupoMaximo: true, cupoPorPublico: true }, // Si tienes un cupo por público
  });

  // Validación para comprobar si el curso tiene espacio
  if (inscripcionesPorCurso >= curso.cupoMaximo) {
    throw new Error('El curso ya alcanzó su capacidad máxima de inscripciones');
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
      CupoMax: number;
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
      c.CupoMax, -- Aquí se reemplaza 'cupoPorPublico' por 'CupoMax'
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
