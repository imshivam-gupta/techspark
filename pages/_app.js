import Navbar from '../components/Navbar'
import '../styles/globals.css'
import { SessionProvider } from "next-auth/react"

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';



import { Typography } from "@material-tailwind/react";
 
import {
  IconButton,
  SpeedDial,
  SpeedDialHandler,
  SpeedDialContent,
  SpeedDialAction,
} from "@material-tailwind/react";
import {
  PlusIcon,
  HomeIcon,
  ArrowLeftIcon,
  ShoppingCartIcon,
  ShoppingBagIcon
} from "@heroicons/react/24/outline";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
 


export default function App({
  Component, pageProps: { session, ...pageProps }
}) {
    

  const [openRight, setOpenRight] = useState(false);
  const openDrawerRight = () => setOpenRight(true);
  const closeDrawerRight = () => setOpenRight(false);

  const router = useRouter();

  const handleBack = () => {
    console.log('back');
    router.back();
  };


  return (
    <>
    <SessionProvider session={session}>
      <Navbar />

      <Component {...pageProps}/>
      <ToastContainer />
      <footer className="w-full bg-white p-8 mt-20">
    
      <hr className="my-8 border-blue-gray-50" />
      <Typography color="blue-gray" className="text-center font-normal">
        &copy; 2023 Shivam Gupta
      </Typography>
    </footer>

    <div className="fixed bottom-10 right-10">
      <SpeedDial placement="bottom">
     
     
        <SpeedDialHandler>
          <IconButton size="lg" className="rounded-full">
            <PlusIcon className="h-5 w-5 transition-transform group-hover:rotate-45" />
          </IconButton>
        </SpeedDialHandler>
        
        <SpeedDialContent>

          <Link href="/"> 
            <SpeedDialAction>
              <HomeIcon className="h-5 w-5" />
            </SpeedDialAction>
          </Link>

          <div  onClick={handleBack}>
          <SpeedDialAction>
            <ArrowLeftIcon className="h-5 w-5" />
          </SpeedDialAction>

          </div>
          
          <Link href="/cart"> 
            <SpeedDialAction>
              <ShoppingCartIcon className="h-5 w-5" />
            </SpeedDialAction>
          </Link>


        </SpeedDialContent>
      </SpeedDial>
      </div>
     

  
    </SessionProvider>
    </>
  )
}