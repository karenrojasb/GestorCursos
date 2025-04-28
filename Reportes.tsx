useEffect(() => {
  const storedIdEmp = localStorage.getItem('idEmp');
  if (storedIdEmp) {
    setIdEmp(Number(storedIdEmp));
  }
}, []);