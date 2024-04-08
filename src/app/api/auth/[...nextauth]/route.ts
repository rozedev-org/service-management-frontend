import axios from 'axios'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'username' },
        password: { label: 'Password', type: 'password', placeholder: '*****' },
      },
      async authorize(credentials, req) {
        const response = await axios.post(
          'http://192.168.3.9:8000/api/service-manager-service/v1/auth/login',
          {
            username: credentials?.username,
            password: credentials?.password,
          },
          {
            validateStatus: (status) => status < 500,
          }
        )
        console.log(response.data)

        if (response.status === 404) throw new Error('No user found')
        if (response.status === 401) throw new Error('Incorrect credentials')

        const { user, token } = response.data
        return {
          id: user.id,
          username: user.userName,
          token: token,
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/login',
  },
  callbacks: {
    async signIn(data) {
      console.log('from signIn', data)
      return true
    },
    async jwt({ token, account, profile }) {
      console.log(token, account, profile)
      return token
    },
    async session({ session, token, user }) {
      console.log(session, token, user)
      return session
    },
  },
})

export { handler as GET, handler as POST }
