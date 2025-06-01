import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useSelector } from 'react-redux'

function App() {
  const [count, setCount] = useState(0)

  const user = useSelector((state) => state.auth.user)

  console.log(user)

  return (
    <>
      <div className='flex  flex-col gap-4 justify-center items-center h-screen'>
   
      <h1 className='text-2xl font-bold text-center'>{ user ? user?.role === 'ADMIN' ? 'Admin' : 'USER' : 'No user found'}</h1>
      <h2 className='text-2xl font-bold text-center'>{ user?.name}</h2>
      <h2 className='text-2xl font-bold text-center'>{ user?.email}</h2>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      </div>
    </>
  )
}

export default App
