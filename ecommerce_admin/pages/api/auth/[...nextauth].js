import NextAuth, { getServerSession } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import {MongoDBAdapter} from "@next-auth/mongodb-adapter"
import clientPromise from '@/lib/mongodb'

const adminEmail = ['chandansashank@gmail.com']

export const authConfig = {
  providers: [
    // OAuth authentication providers...
    
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    session: ({session,token,user}) => {
      if(adminEmail.includes(session?.user?.email))
        return session;
      else
        return false;
    },
  },
}

export default NextAuth(authConfig)

export async function isAdminRequest(req,res)
{
  const session = await getServerSession(req,res,authConfig);
  if(!adminEmail.includes(session?.user?.email))
  {
    res.status(401);
    res.end();
    throw 'Admin Not Logged In!'
  }
}