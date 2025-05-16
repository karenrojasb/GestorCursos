// types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name?: string;
      email?: string;
      id_emp: number;
      nombre: string;
      publico: number;
      esAdmin: boolean;
      esProfesor: boolean;
    };
  }

  interface User {
    id_emp: number;
    nombre: string;
    publico: number;
    esAdmin: boolean;
    esProfesor: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id_emp: number;
    nombre: string;
    publico: number;
    esAdmin: boolean;
    esProfesor: boolean;
  }
}