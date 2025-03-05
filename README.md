"use client"; // Necesario para usar hooks

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulación de autenticación
    if (email === "admin@example.com" && password === "123456") {
      localStorage.setItem("isAuthenticated", "true");
      router.push("/dashboard"); // Redirigir al Dashboard
    } else {
      setError("Correo o contraseña incorrectos");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-[#990000] mb-6">Iniciar Sesión</h1>
      
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-80">
        {error && <p className="text-red-500">{error}</p>}

        <div className="mb-4">
          <label className="block text-gray-700">Correo:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <button type="submit" className="w-full bg-[#990000] text-white px-4 py-2 rounded hover:bg-red-700">
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
}