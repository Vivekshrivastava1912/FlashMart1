import { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import './App.css'
import { Outlet } from 'react-router-dom'
import Header from './component/Header'
import Footer from './component/Footer'
import fetchUserDetails from './utils/fetchUserDetails'
import { setUserDetails } from './redux/userSlice'
import { useDispatch } from 'react-redux'


function App() {
   const dispatch = useDispatch()

  const fetchUser = async () => {
    const userData = await fetchUserDetails()
   dispatch(setUserDetails(userData.data))
  }

  useEffect(() => {
    fetchUser()
  }, [])




  return (
    <>
      <Header />
      <main className='min-h-[78vh]'>
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </>
  )
}

export default App
