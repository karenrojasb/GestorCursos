// ...interfaces e imports se mantienen igual...

export default function CalificarModal({
  nombre,
  documento,
  idCur,
  onClose,
  onGuardar,
}: CalificarModalProps) {
  const [opciones, setOpciones] = useState<OpcionLista[]>([]);
  const [notaSeleccionada, setNotaSeleccionada] = useState<number | null>(null);
  const [idEmp, setIdEmp] = useState<string | null>(null);
  const [guardando, setGuardando] = useState(false);
  const [notaExistenteId, setNotaExistenteId] = useState<number | null>(null); // NUEVO

  useEffect(() => {
    const storedId = localStorage.getItem("id_emp");
    setIdEmp(storedId);
  }, []);

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const respOpciones = await fetch("http://localhost:8090/api/listas/Especificaciones");
        if (!respOpciones.ok) throw new Error("Error al obtener lista de notas");
        const dataOpciones = await respOpciones.json();
        setOpciones(dataOpciones);

        const respNota = await fetch(`http://localhost:8090/api/notas/curso-inscrito?idCurso=${idCur}&idInscrito=${documento}`);
        if (respNota.ok) {
          const dataNota = await respNota.json();
          if (dataNota && dataNota.Nota !== undefined) {
            setNotaSeleccionada(Number(dataNota.Nota));
            setNotaExistenteId(dataNota.id); // Guarda el id para actualizar
          }
        }
      } catch (error) {
        console.error("Error cargando datos:", error);
      }
    };

    if (idCur && documento) {
      fetchDatos();
    }
  }, [idCur, documento]);

  const handleGuardar = async () => {
    if (notaSeleccionada === null || isNaN(notaSeleccionada)) {
      alert("Por favor selecciona una nota válida");
      return;
    }

    if (!idEmp) {
      alert("Error: ID de empleado no encontrado.");
      return;
    }

    setGuardando(true);

    try {
      const notaData = {
        idCurso: idCur,
        idInscrito: documento,
        idRegistro: Number(idEmp),
        Nota: Number(notaSeleccionada),
        FechaRegistro: new Date(),
      };

      let response;
      if (notaExistenteId !== null) {
        // ACTUALIZAR nota existente
        response = await fetch(`http://localhost:8090/api/notas/${notaExistenteId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(notaData),
        });
      } else {
        // CREAR nueva nota
        response = await fetch("http://localhost:8090/api/Notas", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(notaData),
        });
      }

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error al guardar nota:", errorData);
        throw new Error("Error al guardar la nota");
      }

      onGuardar(String(notaSeleccionada));
      onClose();
    } catch (error) {
      console.error("Error al guardar nota:", error);
      alert("Hubo un error al guardar la nota.");
    } finally {
      setGuardando(false);
    }
  };

  // ...JSX se mantiene igual...
}