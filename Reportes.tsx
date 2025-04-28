useEffect(() => {
  const storedIdEmp = localStorage.getItem('id_emp'); 
  if (storedIdEmp) {
    setIdEmp(Number(storedIdEmp)); 
  }
}, []);

useEffect(() => {
  if (idEmp !== null) {
    fetchCursos();
  }
}, [idEmp]);