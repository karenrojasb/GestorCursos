<select
  className="border rounded px-2 py-1 text-sm bg-white"
  value={insc.Especificacion || ""}
  onChange={(e) => handleChangeEspecificacion(insc.id, e.target.value)}
>