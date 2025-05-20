{formatearHorario(curso).map((h) => (
  <div key={`${curso.id}-${h.dia}`}>
    <strong>{h.dia}</strong> {h.ini} - {h.fin}
  </div>
))}