import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useLoginMutation } from '../../Redux/features/auth/authApi'
import { setUser } from '../../Redux/features/auth/authSlice'
import { toast } from 'sonner'
import { verifyToken } from '../../Utils/verifyToken'

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [login] = useLoginMutation()

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const setDemoCredentials = (type) => {
        if (type === 'admin') {
            setFormData({
                email: 'admin@gmail.com',
                password: 'admin123'
            })
        } else {
            setFormData({
                email: 'user@gmail.com',
                password: 'user123'
            })
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const result = await login(formData)
            const user = verifyToken(result?.data?.data?.accessToken);
            dispatch(setUser({
                user,
                token: result?.data?.data?.accessToken
            }))
            toast.success(result?.data?.message)
            navigate('/')
        } catch (error) {
            toast.error(error?.message)
        } finally {
            setIsLoading(false)
        }
    }



  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 items-center justify-center p-4">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col md:flex-row bg-white/30 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden max-w-4xl w-full"
    >
      {/* Illustration Section */}
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="flex-1 flex items-center justify-center p-8 md:p-12"
      >
        <img
          src="https://live.templately.com/wp-content/uploads/2021/02/56468664-image_.png"
          alt="Shopping Illustration"
          className="max-w-full h-auto"
        />
      </motion.div>
      {/* Login Form Section */}
      <motion.div
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="flex-1 p-8 md:p-12 flex flex-col justify-center"
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-2 md:mb-4 text-black">Log In To Your Account</h2>
        
        {/* Demo Credentials Buttons */}
        <div className="flex gap-4 ">
          <motion.button
            onClick={() => setDemoCredentials('admin')}
            className="flex-1 bg-gray-700 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            Admin Demo
          </motion.button>
          <motion.button
            onClick={() => setDemoCredentials('user')}
            className="flex-1 bg-gray-700 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            User Demo
          </motion.button>
        </div>

        <form className="mt-6 md:mt-8" onSubmit={handleSubmit}>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.3 }}
            className="mb-4 md:mb-6"
          >
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Username or Email Address"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 text-sm md:text-base"
            />
          </motion.div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.3 }}
            className="mb-4 md:mb-6 relative"
          >
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password"
              className="w-full px-4 py-3 pr-12 rounded-lg border border-gray-300 text-sm md:text-base"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-[#444]"
              title={showPassword ? 'Hide Password' : 'Show Password'}
            >
              <svg height="20" width="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="10" cy="10" rx="7" ry="5" stroke="#444" strokeWidth="2" />
                <circle cx="10" cy="10" r="2" fill={showPassword ? '#444' : 'none'} stroke="#444" strokeWidth="2" />
              </svg>
            </span>
          </motion.div>

          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={!formData.email || !formData.password || isLoading}
            className={`w-full text-white border-none rounded-lg py-3 px-6 text-sm md:text-base font-semibold cursor-pointer transition-colors ${
              !formData.email || !formData.password || isLoading
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-gray-800 hover:bg-[#444]'
            }`}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </motion.button>
        </form>
        <p className='text-sm text-gray-500 mt-3'>Don't have an account? <Link to="/register" className='text-gray-800 font-bold hover:text-[#444] '>Register</Link></p>
      </motion.div>
    </motion.div>
  </div>
  )
}

export default Login
