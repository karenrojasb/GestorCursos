interface Nota {
  Nota: number;
  idRegistro: number;
  FechaRegistro: string;
}

interface Inscrito {
  id: number;
  idCur: number;
  docInscr: number;
  est: boolean;
  fecreg: string;
  Notas?: Nota[];
}