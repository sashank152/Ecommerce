import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import Layout from '@/Components/layout'
import { useSession } from 'next-auth/react'

export default function Home() {
  const {data : session} = useSession();
  console.log({session})
  return <Layout>
    <div className='text-blue-900 flex justify-between'>
      <h1>
        Hello, <b>{session?.user.name.toLocaleUpperCase()}</b>
      </h1>
      <div className="flex bg-gray-300 gap-1 text-black rounded-lg"> 
        <img src={session?.user?.image} alt ="" className="w-8 h-8 overflow-hidden" />
        <span className='px-2'> 
          {session?.user?.name.toUpperCase()}
        </span>
      </div>
    </div>
  </Layout>
}