import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Sign in with Email & Password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (
          credentials?.email === "rakesh@gmail.com" &&
          credentials?.password === "1234"
        ) {
          console.log("My data", credentials);
          return { id: "1", name: "Rakesh", email: "rakesh@gmail.com" }; //aa n/w section ma session ma "preview ma hase"
        }
        throw new Error("Email Id or Password is wrong!!");
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin", //Aa signin page na loca. mate
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) { //Ahi user ni id,email,name token  ma assign thase,atle te token user ne identify kari shake.
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) { //Ahi token na data session ma pass thase.
      session.user = token;
      return session;
    },
  },
};

const handler = NextAuth(authOptions); //Upar apel options ae handler ma assign thase,ae mujab get & post ni req. jase.
export { handler as GET, handler as POST };
