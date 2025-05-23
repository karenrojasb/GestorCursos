import React, { useState, useEffect } from "react";

function Componente({ inscrito, opciones, nota, handleChangeEspecificacion }) {
  // Estado local para controlar la nota seleccionada
  const [notaSeleccionada, setNotaSeleccionada] = useState(
    inscrito.Notas?.[0]?.Nota ?? ""
  );

  // Efecto para actualizar el estado cuando cambian las notas del inscrito
  useEffect(() => {
    setNotaSeleccionada(inscrito.Notas?.[0]?.Nota ?? "");
  }, [inscrito.Notas]);

  const onChange = (e) => {
    const nuevoValor = Number(e.target.value);
    setNotaSeleccionada(nuevoValor);
    handleChangeEspecificacion(inscrito.docInscr, nuevoValor, nota?.id, inscrito.idCur);
  };

  return (
    <select
      className="border rounded px-2 py-1 text-sm bg-white"
      value={String(notaSeleccionada)}
      onChange={onChange}
    >
      <option value="">-- Selecciona --</option>
      {opciones.map((opcion) => (
        <option key={opcion.id} value={String(opcion.id)}>
          {opcion.Especificacion}
        </option>
      ))}
    </select>
  );
}

export default Componente;