.then((data) => {
  if (data) {
    const cleanedData = {
      ...data,
      Proexterno: data.Proexterno ?? "",
      SegundoPro: data.SegundoPro ?? 0,
      LunesIni: data.LunesIni ?? "",
      LunesFin: data.LunesFin ?? "",
      MartesIni: data.MartesIni ?? "",
      MartesFin: data.MartesFin ?? "",
      MiercolesIni: data.MiercolesIni ?? "",
      MiercolesFin: data.MiercolesFin ?? "",
      JuevesIni: data.JuevesIni ?? "",
      JuevesFin: data.JuevesFin ?? "",
      ViernesIni: data.ViernesIni ?? "",
      ViernesFin: data.ViernesFin ?? "",
      SabadoIni: data.SabadoIni ?? "",
      SabadoFin: data.SabadoFin ?? "",
      DomingoIni: data.DomingoIni ?? "",
      DomingoFin: data.DomingoFin ?? "",
      InicioInscr: data.InicioInscr ?? "",
      FinInscr: data.FinInscr ?? "",
    };
    setFormData(cleanedData);
  } else {
    throw new Error("Datos del curso vacíos");
  }
})




