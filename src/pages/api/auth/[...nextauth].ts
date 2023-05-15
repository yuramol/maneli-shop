import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { request, gql } from 'graphql-request';

interface GetUserTokenResponse {
  login: {
    jwt: string;
    user: {
      id: string;
      username: string;
      email: string;
      confirmed: boolean;
      blocked: boolean;
    };
  };
}

const GET_USER = gql`
  mutation Login($input: UsersPermissionsLoginInput!) {
    login(input: $input) {
      jwt
      user {
        id
        username
        email
      }
    }
  }
`;

export default NextAuth({
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: {},
        password: {},
      },
      async authorize({ email, password }: any) {
        if (!email) {
          return null;
        }

        const data: GetUserTokenResponse = await request(
          `${process.env.BASE_URL}/graphql` as string,
          GET_USER,
          {
            input: {
              identifier: email,
              password,
            },
          },
          // {
          //   authorization:
          //     'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjg0MTM3MTU1LCJleHAiOjE2ODY3MjkxNTV9.ZlEwFA01bnqtKDPk29O0JMzctsIKzswpHDNWAPCnCyo',
          // },
        )
          .then(res => {
            console.log('debug > res===', res);
          })
          .catch(err => {
            console.log('debug > err===', err);
          });

        console.log('debug > data===', data);

        return {
          id: '',
          user: data?.login?.user,
          accessToken: data?.login?.jwt,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        const { accessToken, ...rest } = user;
        token.accessToken = accessToken;
        token.user = rest;
      }
      return token;
    },
    async session({ session, token }: any) {
      session.accessToken = token.accessToken;
      session.user = token.user?.user;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth/signin',
  },
});
