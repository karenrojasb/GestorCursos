interface Inscripcion {
  id: number;
  idCur?: number;
  docInscr: string;
  nombre: string;
  est: number;
  fecreg: string;
  NombreCurso?: string;
  Cursos?: {
    id: number;
    NombreCurso: string;
  };
  curso?: {
    id: number;
    NombreCurso: string;
  };
  rol?: string; // <--- Agregado aquí
}