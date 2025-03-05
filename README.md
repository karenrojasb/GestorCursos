"use client"; // Necesario para usar hooks en App Router

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import Image from "next/image";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem("isAuthenticated");
    if (auth === "true") {
      setIsAuthenticated(true);
    } else {
      router.push("/login");
    }
  }, []);

  if (!isAuthenticated) return null; // Evita mostrar contenido antes de la verificación

  return (
    <html lang="es">
      <head>
        <title>Gestor de Cursos</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body style={{ margin: 0, fontFamily: "Arial, sans-serif" }}>
        <header className="w-full flex items-center justify-between px-6 py-4">
          {/* LOGO */}
          <img
            src="/img/ecijg126.png"
            alt="Logo"
            className="h-20 transition-all duration-300 ease-in-out transform hover:scale-110 active:scale-95"
          />

          <div className="flex flex-col items-center space-x-1 ml-auto">
            <span className="text-xl text-gray-700 font-medium">NOMBRE USUARIO</span>
            {/* BOTÓN DE SALIDA */}
            <button
              className="flex items-center space-x-2 border border-[#990000] px-2 py-2 rounded hover:bg-[#990000] hover:text-white transition"
              onClick={() => {
                localStorage.removeItem("isAuthenticated");
                router.push("/login");
              }}
            >
              <ArrowLeftIcon className="h-6 w-6" />
              SALIR
            </button>
          </div>
        </header>

        <main>{children}</main>

        <footer className="mt-10 p-4 text-center bg-white">
          <div className="bg-blue-800 absolute bottom-0 left-4 border border-blue-700 p-4 rounded-lg">
            <Image src="/img/osiris 2.png" alt="Logo OSIRIS" width={160} height={60} />
          </div>
          <p>&copy; {new Date().getFullYear()} - Plataforma de gestión de cursos</p>
        </footer>
      </body>
    </html>
  );
}