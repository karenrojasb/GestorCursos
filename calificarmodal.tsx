useEffect(() => {
  const storedId = localStorage.getItem("id_emp");
  console.log("ID EMPLEADO CARGADO:", storedId);
  setIdEmp(storedId);
}, []);