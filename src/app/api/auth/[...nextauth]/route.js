import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signupWithMurrvy } from "@/lib/auth/murrvySignup";
import { loginWithMurrvy } from "@/lib/auth/murrvyLogin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const isProduction = process.env.NODE_ENV === "production";

if (!process.env.AUTH_TRUST_HOST) {
  process.env.AUTH_TRUST_HOST = "true";
}

if (!process.env.AUTH_SECRET && !process.env.NEXTAUTH_SECRET) {
  process.env.AUTH_SECRET = "dev-only-auth-secret-change-in-production";

  if (isProduction) {
    console.warn("AUTH_SECRET is missing. Configure AUTH_SECRET for secure production sessions.");
  }
}

const signupCredentials = {
  first_name: { label: "First name", type: "text" },
  last_name: { label: "Last name", type: "text" },
  username: { label: "Username", type: "text" },
  mobile_number: { label: "Mobile number", type: "text" },
  password: { label: "Password", type: "password" },
  address1: { label: "Address line 1", type: "text" },
  address2: { label: "Address line 2", type: "text" },
  city: { label: "City", type: "text" },
  state: { label: "State", type: "text" },
  country: { label: "Country", type: "text" },
  pincode: { label: "Pincode", type: "text" },
};

const loginCredentials = {
  username: { label: "Username", type: "text" },
  password: { label: "Password", type: "password" },
};

const authOptions = {
  trustHost: process.env.AUTH_TRUST_HOST === "true",
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 7,
  },
  pages: {
    signIn: "/page/login",
  },
  providers: [
    CredentialsProvider({
      id: "murrvy-signup",
      name: "Murrvy Signup",
      credentials: signupCredentials,
      authorize: async (credentials = {}) => {
        try {
          const result = await signupWithMurrvy(credentials);
          return {
            id: result.user.id,
            ...result.user,
            session_source: "signup",
          };
        } catch (error) {
          throw new Error(error?.message || "Unable to complete signup.");
        }
      },
    }),
    CredentialsProvider({
      id: "murrvy-login",
      name: "Murrvy Login",
      credentials: loginCredentials,
      authorize: async (credentials = {}) => {
        try {
          const result = await loginWithMurrvy(credentials);
          return {
            id: result.user.id,
            ...result.user,
            session_source: "login",
          };
        } catch (error) {
          throw new Error(error?.message || "Unable to complete login.");
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = user;
      }

      return token;
    },
    session: async ({ session, token }) => {
      if (token?.user) {
        session.user = token.user;
      }

      return session;
    },
  },
};

export const { handlers } = NextAuth(authOptions);
export const { GET, POST } = handlers;
