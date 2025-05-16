backend
 async iniciarSesion(e_mail: string) {
    const usuario = await this.prisma.$queryRaw<any[]>`
      SELECT id_emp, nombre, publico, e_mail 
      FROM gescur.emp_nomina 
      WHERE TRIM(e_mail) = TRIM(${e_mail})`;
  
    if (usuario.length === 0) {
      throw new NotFoundException('Usuario no encontrado');
    }
  
    const usuarioEncontrado = usuario[0];

    
    const esAdmin = await this.prisma.rol_usuario.count({
      where: { usuario: usuarioEncontrado.e_mail, id_rol: 1 },
    });

    
    const esProfesor = await this.prisma.rol_usuario.count({
      where: { usuario: usuarioEncontrado.e_mail, id_rol: 2 },
    });

    return {
      id_emp: usuarioEncontrado.id_emp,
      nombre: usuarioEncontrado.nombre,
      publico: usuarioEncontrado.publico,
      e_mail: usuarioEncontrado.e_mail,
      esAdmin: esAdmin > 0,
      esProfesor: esProfesor > 0,
    };
  }
}
 @Post('login')
  async login(@Body() body: { e_mail: string }) {
    if (!body.e_mail || body.e_mail.trim() === '') {
      throw new Error('El email es obligatorio');
    }

    return this.usuarioService.iniciarSesion(body.e_mail);
  }
}


front end
 useEffect(() => {
    // RECUPERAR ID_EMP DEL LOCALSTORAGE AL INICIAR LA APLICACIÓN
    const storedIdEmp = localStorage.getItem("id_emp");
    if (storedIdEmp) {
      console.log("ID de empleado recuperado:", storedIdEmp);
    }
  }, []);

  // FUNCIÓN PARA INICIAR SESIÓN Y OBTENER DATOS DEL USUARIO
  const iniciarSesion = async () => {
    setError("");

    if (e_mail.trim() === "") {
      setError("Ingrese su email.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8090/api/usuario/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ e_mail }),
      });

      const data = await response.json();
      console.log("Datos recibidos del backend:", data);

      if (!response.ok) {
        throw new Error(data.message || "El email no es correcto.");
      }

      // VERIFICA SI EL USUARIO TIENE UN ID VALIDO
      if (!data.id_emp) {
        throw new Error("No se encontró el documento del usuario.");
      }

      // VERIFIVAR SI EL USUARIO TIENE UN ROL PERMITIDO
      const esUsuarioValido = data.publico === 1 || data.publico === 2 || Boolean(data.esAdmin);
      if (!esUsuarioValido) {
        throw new Error("No tiene permisos para ingresar al sistema.");
      }

      // GUARDAR ID_EMP EN LOCALSTORAGE
      localStorage.setItem("id_emp", data.id_emp);

      // GUARDAR USUARIO EN EL ESTADO
      setUsuario({
        nombre: data.nombre,
        publico: data.publico,
        esAdmin: Boolean(data.esAdmin),
        esProfesor: Boolean(data.esProfesor),
      });
    } catch (error: any) {
      setError(error.message);
    }
  };

  // FUNCIÓN PARA CERRAR SESIÓN
  const cerrarSesion = () => {
    setUsuario(null);
    localStorage.removeItem("id_emp"); 
  };
