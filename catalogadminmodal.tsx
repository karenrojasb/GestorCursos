 {cursoEditar && (
        <CursoEditarModal 
        curso={cursoEditar} 
        onClose={handleCerrarEditor}
        onSave={handleGuardarEdicion}/>
      )}
