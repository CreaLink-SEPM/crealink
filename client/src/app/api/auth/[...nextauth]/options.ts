import { AuthOptions, ISODateString, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
// import axios from 'axios';
const axios = require('axios');
import { JWT } from 'next-auth/jwt';

export interface CustomSession {
  user?: CustomUser;
  expires: ISODateString;
}

export interface CustomUser {
  id?: string | null;
  name?: string | null;
  username?: string | null;
  email?: string | null;
  image?: string | null;
  user_image?: string | null;
  followers?: number | null;
  bio?: string | null;
  follower?: [] | null;
  accessToken?: string | null;
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const res = await axios.post('http://54.169.199.32:5000/api/user/login', {
          email: credentials?.email,
          password: credentials?.password,
        });

        console.log(res.data);
        const user = res.data;

        if (user) {
          return {
            ...user,
            id: user.id,
          };
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return { ...token, ...user };
    },
    async session({ session, token, user }: { session: CustomSession; token: JWT; user: User }) {
      session.user = token.user as CustomUser;
      return session;
    },
  },
};
