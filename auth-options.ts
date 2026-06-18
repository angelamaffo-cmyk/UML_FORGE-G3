import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

export const credentialsSchema = z.object({
  email: z.string().trim().toLowerCase().email().max(255),
  password: z.string().min(8).max(200),
});

const providers: NextAuthOptions["providers"] = [
  CredentialsProvider({
    name: "Credentials",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },

    async authorize(credentials) {
      console.log("=================================");
      console.log("Tentative de connexion");
      console.log("Credentials reçues :", credentials);

      const parsed = credentialsSchema.safeParse(credentials);

      if (!parsed.success) {
        console.log("Validation Zod échouée :", parsed.error);
        return null;
      }

      const { email, password } = parsed.data;

      console.log("Email recherché :", email);

      const user = await prisma.user.findUnique({
        where: { email },
      });

      console.log("Utilisateur trouvé :", user);

      if (!user) {
        console.log("Utilisateur introuvable");
        return null;
      }

      if (!user.passwordHash) {
        console.log("passwordHash est vide");
        return null;
      }

      const passwordValid = await bcrypt.compare(
        password,
        user.passwordHash
      );

      console.log("Mot de passe valide :", passwordValid);

      if (!passwordValid) {
        console.log("Mot de passe incorrect");
        return null;
      }

      console.log("Connexion autorisée");

      return {
        id: user.id,
        email: user.email,
        name: user.name ?? undefined,
      };
    },
  }),
];

if (process.env.FACEBOOK_CLIENT_ID && process.env.FACEBOOK_CLIENT_SECRET) {
  providers.push(
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    })
  );
}

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  );
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: "/login",
  },

  providers,

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as { id: string }).id;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user && token.id) {
        (session.user as { id?: string }).id = token.id as string;
      }

      return session;
    },
  },

  debug: true,
};