const [idEmp, setIdEmp] = useState<number | null>(null); // <- corregido de 'Number' a 'number'



useEffect(() => {
  const storedId = localStorage.getItem("id_emp");
  const parsedId = storedId ? Number(storedId) : null;
  setIdEmp(parsedId);
}, []);



