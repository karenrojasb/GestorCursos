
interface Nota {
  Nota: number;
  idRegistro: number;
  FechaRegistro: string;
  
}

interface Inscrito {
  FechaRegistro: any;
  idRegistro: string;
  id: number;
  idCur: number;
  docInscr: number;
  est: boolean;
  fecreg: string;
  Notas?: Nota[];
}

interface Curso {
  id: number;
  NombreCurso: string;
  Valor: number;
  Publico: number;
  Periodo: string;
  Inicio: string;
  Fin: string;
  Horas: number;
  CupoMax: number;
  Lugar: string;
  Linea: number;
  Estado: number;
  Modalidad: number;
  Unidad: number;
  Profesor: number;
  SegundoPro: string;
  Proexterno: string;
  Descripcion: string;
  IdTipoCurso: number;
  NombreProfesor?: string;
  LunesIni: string;
  LunesFin: string;
  MartesIni: string;
  MartesFin: string;
  MiercolesIni: string;
  MiercolesFin: string;
  JuevesIni: string;
  JuevesFin: string;
  ViernesIni: string;
  ViernesFin: string;
  SabadoIni: string;
  SabadoFin: string;
  DomingoIni: string;
  DomingoFin: string;
  InicioInscr: string;
  FinInscr: string;

  Inscritos ?: string;

}
