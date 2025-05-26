<div className="flex flex-col gap-1 w-52">
  <span className="text-sm font-semibold text-gray-600">Año</span>
  <select
    id="year-select"
    value={yearSeleccionado ?? ""}
    onChange={(e) => handleChangeYear(e.target.value)}
    className="bg-white border border-gray-300 rounded-md px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
  >
    {year.map((año) => (
      <option key={año} value={año}>
        {año}
      </option>
    ))}
  </select>
</div>