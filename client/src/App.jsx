import { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import './App.css'
import { Outlet } from 'react-router-dom'
import Header from './component/Header'
import Footer from './component/Footer'
import fetchUserDetails from './utils/fetchUserDetails'
import { setUserDetails } from './redux/userSlice'
import { setAllCategory } from './redux/productSlice'
import { useDispatch } from 'react-redux'
import Axios from './utils/Axios'
import SummaryApi from './common/SummaryApi'


function App() {
   const dispatch = useDispatch()

  const fetchUser = async () => {
    const userData = await fetchUserDetails()
   dispatch(setUserDetails(userData.data))
  }

   const fetchCategory = async () => {
      try {
       
        const response = await Axios({
          ...SummaryApi.getCategory
        })
        const { data: responseData } = response
        if (responseData.success) {
          
          dispatch(setAllCategory(responseData.data))
      
        }
      }
      catch (error) {
      }
      finally {
     
      }
    }
  
   

  useEffect(() => {
    fetchUser()
    fetchCategory()
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
