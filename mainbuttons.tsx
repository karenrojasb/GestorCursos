"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import CatalogoModal from "./catalogomodal";
import CatalogoAdminModal from "./catalogoadminmodal";
import CursoModal from "./CursoModal";
import InscritosModal from "./InscripcionesModal";
import {
  BookOpenIcon,
  DocumentCheckIcon,
  PencilIcon,
  XMarkIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";
import { PencilSquareIcon } from "@heroicons/react/16/solid";
import { ChartBarIcon } from "@heroicons/react/16/solid";
import Certificados from "../user/certificados/page";

interface MainButtonsProps {
  onSelect: (section: string) => void;
  publico: number;
  esAdmin: boolean;
  esProfesor: boolean;
}

export default function MainButtons({ onSelect, publico, esAdmin }: MainButtonsProps) {
  const [showCatalogo, setShowCatalogo] = useState(false);
  const [showGestorModal, setShowGestorModal] = useState(false);
  const [showCatalogoAdmin, setShowCatalogoAdmin] = useState(false);
  const [showCursoModal, setShowCursoModal] = useState(false);
  const [showInscritosModal, setShowInscritosModal] = useState(false);
  const [showCertificados, setShowCertificados] = useState(false);

  useEffect(() => {
    console.log("Valor de publico:", publico);
    console.log("Valor de esAdmin:", esAdmin);
    console.log("Valor de esProfesor", esProfesor)
  }, [publico, esAdmin]);

  const handleSaveCurso = async (data: any) => {
    try {
      const response = await fetch("http://localhost:8090/api/cursos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Error al guardar el curso");

      alert("Curso guardado con éxito");
      setShowCursoModal(false);
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un error al guardar el curso");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center  w-full">
      <div className="w-full max-w-md mt-48 flex flex-col space-y-4 items-center">
        
        {/* BOTÓN CATÁLOGO */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowCatalogo(true)}
          className="flex items-center justify-center gap-3 w-4/5 bg-[#990000] hover:bg-red-700
                     text-white py-3 rounded-lg shadow-md transition-all hover:shadow-lg"
        >
          <BookOpenIcon className="h-6 w-6 text-white" />
          Catálogo
        </motion.button>
        {showCatalogo && <CatalogoModal onClose={() => setShowCatalogo(false)} />}

        {/* BOTÓN CERTIFICADOS */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowCertificados(true)}
          className="flex items-center justify-center gap-3 w-4/5 bg-[#990000] hover:bg-red-700
                     text-white py-3 rounded-lg shadow-md transition-all hover:shadow-lg"
        >
          <DocumentCheckIcon className="h-6 w-6 text-white" />
          Certificados
        </motion.button>
        {showCertificados && <Certificados onClose={() => setShowCertificados(false)} />}

        {esProfesor && ( 
              <motion.button 
              whileHover={{scale: 1.05}}
              whileTap={{scale: 0.95}}
              onClick={() => {

              }}
              className="flex items-center justify-center gap-3 w-4/5 bg-[#990000] hover:bg-red-700 
              text-white py-3 rounded-lg shadow-md transition-all hover:shadow-lg"
              ></motion.button>
            )}



        {/* BOTONES SOLO PARA ADMINISTRADORES */}
        {esAdmin && (
          <>
            {/* BOTÓN GESTOR DE CURSOS */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowGestorModal(true)}
              className="flex items-center justify-center gap-3 w-4/5 bg-[#990000] hover:bg-red-700
                         text-white py-3 rounded-lg shadow-md transition-all hover:shadow-lg"
            >
              <PencilIcon className="h-6 w-6 text-white" />
              Gestor de Cursos
            </motion.button>




            {/* MODAL GESTOR DE CURSOS */}
            {showGestorModal && (
              <div className="p-6 rounded-lg shadow-lg fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="relative flex flex-col items-center gap-3 w-full max-w-3xl bg-white 
                                py-6 px-8 rounded-lg shadow-md">
                  
                  {/* BOTÓN CERRAR */}
                  <button
                    onClick={() => setShowGestorModal(false)}
                    className="absolute top-2 right-2 text-gray-500 hover:text-[#990000] transition-transform duration-300 transform hover:rotate-90 hover:scale-110"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>

                  {/* TÍTULO */}
                  <h2 className="text-3xl font-bold text-[#990000] text-center">Gestor de Cursos</h2>

                  <div className="w-full flex flex-col items-center justify-center space-y-3 text-center">
                    {/* BOTÓN CREAR CURSO */}
                    <motion.button
                      whileHover={{ scale: 1.1, backgroundColor: "#b30000" }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        console.log("Abriendo modal de Crear Curso");
                        setShowCursoModal(true);
                        setShowGestorModal(false);
                      }}
                      className="flex items-center gap-3 w-4/5 bg-[#990000] text-white py-3 rounded-lg transition-all hover:shadow-lg justify-center"
                    >
                      <PencilSquareIcon className="h-6 w-6 text-white" />
                      Crear Curso
                    </motion.button>

                    {/* BOTÓN CATÁLOGO ADMIN */}
                    <motion.button
                      whileHover={{ scale: 1.1, backgroundColor: "#b30000" }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        console.log("Abriendo Catálogo Admin");
                        setShowCatalogoAdmin(true);
                        setShowGestorModal(false);
                      }}
                      className="flex items-center gap-3 w-4/5 bg-[#990000] text-white py-3 rounded-lg transition-all hover:shadow-lg justify-center"
                    >
                      <BookOpenIcon className="h-6 w-6 text-white" />
                      Catálogo
                    </motion.button>

                    {/* BOTÓN DE REPORTES */}
                    <motion.button
                      whileHover={{ scale: 1.1, backgroundColor: "#b30000" }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        console.log("Abriendo Modal de Inscritos");
                        setShowInscritosModal(true);
                        setShowGestorModal(false);
                      }}
                      className="flex items-center gap-3 w-4/5 bg-[#990000] text-white py-3 rounded-lg transition-all hover:shadow-lg justify-center"
                    >
                      <ChartBarIcon className="h-6 w-6 text-white" />
                      Reportes
                    </motion.button>

                    {/* BOTÓN VER INSCRITOS */}
                    <motion.button
                      whileHover={{ scale: 1.1, backgroundColor: "#b30000" }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        console.log("Abriendo Modal de Inscritos");
                        setShowInscritosModal(true);
                        setShowGestorModal(false);
                      }}
                      className="flex items-center gap-3 w-4/5 bg-[#990000] text-white py-3 rounded-lg transition-all hover:shadow-lg justify-center"
                    >
                      <UserGroupIcon className="h-6 w-6 text-white" />
                      Ver Inscritos
                    </motion.button>
                  </div>
                </div>
              </div>
            )}


            {/* MODALES ADMIN */}
            {showCatalogoAdmin && <CatalogoAdminModal onClose={() => setShowCatalogoAdmin(false)} />}
            {showCursoModal && <CursoModal onClose={() => setShowCursoModal(false)} onSave={handleSaveCurso} />}
            {showInscritosModal && <InscritosModal onClose={() => setShowInscritosModal(false)} />}
          </>
        )}
      </div>
    </div>
  );
}
