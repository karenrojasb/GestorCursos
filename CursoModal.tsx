@Get("profesores")
async getProfesores() {
  return this.prisma.emp_nomina.findMany({
    where: {
      publico: 1, // Solo profesores
    },
    select: {
      id: true,
      nombre: true,
    },
  });
}