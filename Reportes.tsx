useEffect(() => {
  const storedIdEmp = localStorage.getItem('id_emp'); // O como hayas guardado el id
  if (storedIdEmp) {
    setIdEmp(Number(storedIdEmp)); // Guarda el id_emp en el estado
  }
}, []);