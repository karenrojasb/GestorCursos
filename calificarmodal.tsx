
  useEffect(() => {
    // Obtener el id_emp del usuario actual desde localStorage
    const storedUser = localStorage.getItem("usuario");
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        if (userData?.id_emp) {
          setIdEmp(userData.id_emp);
        }
      } catch (e) {
        console.error("Error al parsear el usuario del localStorage:", e);
      }
    }



<p className="text-center mb-4">
  <strong>id_emp actual:</strong> {idEmp ?? "No disponible"}
</p>