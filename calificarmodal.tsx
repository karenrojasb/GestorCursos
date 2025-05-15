onst handleGuardar = async () => {
    if (notaSeleccionada === null || isNaN(notaSeleccionada)) {
      alert("Por favor selecciona una nota válida");
      return;
    }

    if (!idEmp) {
      alert("Error: ID de empleado no encontrado.");
      return;
    }

    setGuardando(true);

    

      const notaExistente = responseGet.ok ? await responseGet.json() : null;


        if (!responsePut.ok) throw new Error("Error al actualizar la nota.");
      } else {
        const responsePost = await fetch("http://localhost:8090/api/notas", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idCurso: idCur,
            idInscrito: documento,
            idRegistro: Number(idEmp),
            Nota: notaSeleccionada,
            FechaRegistro: new Date(),
          }),
        });

        if (!responsePost.ok) throw new Error("Error al crear la nota.");
      }

      onGuardar(String(notaSeleccionada));
      onClose();
    } catch (error) {
      console.error("Error al guardar nota:", error);
      alert("Hubo un error al guardar la nota.");
    } finally {
      setGuardando(false);
    }
  };
