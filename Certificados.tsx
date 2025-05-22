const [especificaciones, setEspecificaciones] = useState<{ id: number; Especificacion: string }[]>([]);

useEffect(() => {
  const fetchEspecificaciones = async () => {
    try {
      const res = await fetch("http://localhost:8090/api/listas/Especificaciones");
      const data = await res.json();
      setEspecificaciones(data);
    } catch (error) {
      console.error("Error al obtener las especificaciones:", error);
    }
  };
  fetchEspecificaciones();
}, []);



Nota: nota?.Nota ?? "",



<sele
  value={nota?.Nota ?? ""}
  onChange={(e) => {
    // Aquí puedes manejar el cambio de nota si deseas guardarlo
    const nuevaNota = parseInt(e.target.value);
    nota.Nota = nuevaNota; // o setNotas(prev => ...)
  }}
  className="border rounded px-2 py-1"
>
  <option value="">Seleccione</option>
  {especificaciones.map((esp) => (
    <option key={esp.id} value={esp.id}>{esp.Especificacion}</option>
  ))}
</sele>