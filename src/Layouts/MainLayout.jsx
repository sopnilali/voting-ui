import React from 'react'
import Navbar from '../Shared/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Shared/Footer'

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <main className='min-h-screen bg-gray-100 pt-20'>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout
