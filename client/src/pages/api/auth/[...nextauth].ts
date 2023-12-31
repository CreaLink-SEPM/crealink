import NextAuth, { NextAuthOptions, AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';
import { JWT } from "next-auth/jwt";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',

      credentials: {
        email: { label: 'email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        // const { email, password } = credentials as { email: string; password: string };
        // const res = await fetch('http://54.169.199.32:5000/api/user/login', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify({
        //     email,
        //     password,
        //   }),
        // });

        const res = await axios.post('http://54.169.199.32:5000/api/user/login', {
          email: credentials?.email,
          password: credentials?.password,
        });

        const user = res.data;
        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user}) {
        if (user) {
            token.user = user
        }
        return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = token as any;

      return session;
    },
  },
  // pages: {
  //   signIn: '/login',
  // },
};

export default NextAuth(authOptions);
