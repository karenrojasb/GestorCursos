const [inscripciones, setInscripciones] = useState<Inscrito[]>([]);
const [inscripcionesFiltradas, setInscripcionesFiltradas] = useState<Inscrito[]>([]);
const [opciones, setOpciones] = useState<{ id: number; Especificacion: string }[]>([]);
const [guardando, setGuardando] = useState(false);






interface Inscrito {
  // existentes...
  idNotas?: number; // este lo usas para saber si se actualiza o se crea
  Especificacion?: string; // este lo usas para mostrar la descripción
}




const fetchOpciones = async () => {
  try {
    const res = await fetch("http://localhost:8090/api/especificaciones");
    const data = await res.json();
    setOpciones(data);
  } catch (error) {
    console.error("Error al obtener las opciones:", error);
  }
};

useEffect(() => {
  fetchOpciones();
}, []);





<select
  value={inscrito.idNotas || ""}
  onChange={(e) => handleChangeEspecificacion(inscrito.id, parseInt(e.target.value))}
  className="border p-1 rounded"
>
  <option value="">Seleccionar</option>
  {opciones.map(op => (
    <option key={op.id} value={op.id}>{op.Especificacion}</option>
  ))}
</select>