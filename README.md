"use client";
import { ReactNode, useState } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  const [usuario, setUsuario] = useState<string | null>(null);
  const [id, setId] = useState("");

  const iniciarSesion = () => {
    if (id.trim() !== "") {
      setUsuario(id); // Aquí podrías validar con una API en lugar de solo guardar el ID
    }
  };

  if (!usuario) {
    return (
      <html lang="es">
        <body className="flex items-center justify-center h-screen bg-gray-200">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">Iniciar Sesión</h2>
            <input
              type="text"
              placeholder="Ingrese su ID"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="border p-2 w-full mb-3"
            />
            <button
              onClick={iniciarSesion}
              className="bg-blue-600 text-white px-4 py-2 rounded w-full"
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
      <body>
        <header className="w-full flex items-center justify-between px-6 py-4 bg-white shadow">
          <img
            src="/img/ecijg126.png"
            alt="Logo"
            className="h-20 transition-all duration-300 ease-in-out transform hover:scale-110 active:scale-95"
          />
          <div className="flex flex-col items-center space-x-1 ml-auto">
            <span className="text-xl text-gray-700 font-medium">{usuario}</span>
            <button
              className="flex items-center space-x-2 border border-red-600 px-2 py-2 rounded hover:bg-red-600 hover:text-white transition"
              onClick={() => setUsuario(null)}
            >
              Cerrar Sesión
            </button>
          </div>
        </header>

        <main>{children}</main>
      </body>
    </html>
  );
}