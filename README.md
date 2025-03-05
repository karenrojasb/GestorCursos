"use client";
import { ReactNode, useState } from "react";
import Image from "next/image";
import "./globals.css";

interface LayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  const [usuario, setUsuario] = useState<string | null>(null);
  const [id, setId] = useState("");

  const iniciarSesion = () => {
    if (id.trim() !== "") {
      setUsuario(id); // Simulación de login, puedes reemplazar con una API
    }
  };

  if (!usuario) {
    return (
      <html lang="es">
        <body className="flex items-center justify-center h-screen bg-gray-200">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Iniciar Sesión</h2>
            <input
              type="text"
              placeholder="Ingrese su ID"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="border p-2 w-full mb-3 rounded"
            />
            <button
              onClick={iniciarSesion}
              className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700 transition"
            >
              Entrar
            </button>
          </div>
        </body>
      </html>
    );
  }

  return (
    <html lang="es">
      <body className="bg-gray-100">
        <header className="w-full flex items-center justify-between px-6 py-4 bg-white shadow-md">
          {/* LOGO */}
          <img
            src="/img/ecijg126.png"
            alt="Logo"
            className="h-20 transition-transform duration-300 ease-in-out hover:scale-110 active:scale-95"
          />

          {/* Usuario y botón de salida */}
          <div className="flex flex-col items-center ml-auto">
            <span className="text-xl text-gray-700 font-medium">{usuario}</span>
            <button
              className="flex items-center space-x-2 border border-red-600 px-3 py-2 rounded hover:bg-red-600 hover:text-white transition"
              onClick={() => setUsuario(null)}
            >
              Cerrar Sesión
            </button>
          </div>
        </header>

        <main className="p-4">{children}</main>

        {/* Footer */}
        <footer className="bg-white text-center py-4 mt-6 shadow-inner relative">
          <div className="absolute bottom-4 left-4 bg-blue-800 border border-blue-700 p-4 rounded-lg">
            <Image src="/img/osiris 2.png" alt="Logo OSIRIS" width={160} height={60} />
          </div>
          <p className="text-gray-700">&copy; {new Date().getFullYear()} - Plataforma de gestión de cursos</p>
        </footer>
      </body>
    </html>
  );
}