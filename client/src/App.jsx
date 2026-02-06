import { useState } from 'react'
import toast ,{Toaster} from 'react-hot-toast'
import './App.css'
import { Outlet } from 'react-router-dom'
import Header from './component/Header'
import Footer from './component/Footer'

function App() {


  return (
    <>
    <Header/>
  <main className='min-h-[78vh]'>
    <Outlet/>
   </main>
    <Footer/>
    <Toaster/>
    </>
  )
}

export default App
