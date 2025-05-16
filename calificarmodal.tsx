import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        e_mail: { label: "Email", type: "text" },
      },
      async authorize(credentials) {
        const res = await fetch("http://localhost:8090/api/usuario/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ e_mail: credentials?.e_mail }),
        });

        const user = await res.json();

        if (!res.ok || !user.id_emp) {
          throw new Error(user.message || "Credenciales inválidas");
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id_emp = user.id_emp;
        token.nombre = user.nombre;
        token.publico = user.publico;
        token.esAdmin = user.esAdmin;
        token.esProfesor = user.esProfesor;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id_emp = token.id_emp;
      session.user.nombre = token.nombre;
      session.user.publico = token.publico;
      session.user.esAdmin = token.esAdmin;
      session.user.esProfesor = token.esProfesor;
      return session;
    },
  },
  pages: {
    signIn: "/login", // Página de login personalizada
  },
  session: {
    strategy: "jwt",
  },
  secret: "una_clave_secreta", // Puedes usar process.env.NEXTAUTH_SECRET
});

export { handler as GET, handler as POST };







