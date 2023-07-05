import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useSession, signIn, signOut } from "next-auth/react"
import Nav from '@/Components/nav'
import { useState } from 'react'
import Logo from './logo'

export default function Layout({children}) {
  const [showNavigation, setShowNav] = useState(false);
  const { data:session } = useSession();
  if(!session){
    return (
      <div className = "bg-bgGray w-screen h-screen flex items-center">
        <div className='text-center w-full'>
          <button onClick={()=>signIn('google')} className='bg-white p-2 px-4 rounded-lg'>Login With Google</button>
        </div> 
      </div>
    )
  }
  
  return( 
    <div className='bg-bgGray min-h-screen '>
      <div className='block md:hidden flex items-center'>
        <button onClick={() => setShowNav(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
            <path fillRule="evenodd" d="M4.5 12a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" clipRule="evenodd" />
          </svg> 
        </button>
        <div className='flex grow justify-center mr-10'>
          <Logo />
        </div>
      </div>
      <div className='flex'>
          <Nav show={showNavigation} />
        <div className="bg-white flex-grow mt-2 mr-2 mb-2 rounded-lg p-4">
          {children}
        </div>
      </div>
    </div>
  )
}
