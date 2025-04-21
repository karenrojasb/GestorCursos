

  async obtenerPorId(id: number) {
    const inscripcion = await this.prisma.inscripciones.findUnique({ where: { id } });
    if (!inscripcion) throw new NotFoundException('Inscripción no encontrada');
    return inscripcion;
  }


  @Get(':id')
  obtenerPorId(@Param('id') id: string) {
    return this.inscripcionesService.obtenerPorId(Number(id));
  }
