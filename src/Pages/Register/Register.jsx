import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useRegisterMutation } from '../../Redux/features/auth/authApi'
import { toast } from 'sonner'
import { useCreateUserMutation } from '../../Redux/features/user/userApi'

const Register = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [createUser] = useCreateUserMutation()

    const [formData, setFormData] = useState({
        name: '',
        passportNumber: '',
        phoneNumber: '',
        homePhoneNumber: '',
        email: '',
        password: '',
        confirmPassword: '',
        code: ''
    })

    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isCodeLoading, setIsCodeLoading] = useState(false)

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleGenerateCode = async (e) => {
        e.preventDefault();
        setIsCodeLoading(true);
        // Generate a random 6-digit code
        const randomCode = Math.floor(100000 + Math.random() * 900000).toString();
        setTimeout(() => {
            setFormData((prev) => ({ ...prev, code: randomCode }));
            toast.success('Code generated!');
            setIsCodeLoading(false);
        }, 500);
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match')
            return
        }
        setIsLoading(true)
        const userInfo = {
            name: formData.name,
            passportNumber: formData.passportNumber,
            phoneNumber: formData.phoneNumber,
            homePhoneNumber: formData.homePhoneNumber,
            email: formData.email,
            password: formData.password,
            code: formData.code
        }
        const response = await createUser(userInfo)
        console.log(response)
        if (response.data) {
            toast.success('User created successfully')
            navigate('/login')
        } else {
            toast.error('User creation failed')
        }
        // Registration logic here
        setIsLoading(false)
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col md:flex-row rounded-2xl shadow-lg max-w-4xl w-full bg-white/30 backdrop-blur-md"
            >
                <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-12"
                >
                    <img
                        src="https://live.templately.com/wp-content/uploads/2021/02/56468664-image_.png"
                        alt="Shopping Illustration"
                        className="w-full max-w-[300px] h-auto"
                    />
                </motion.div>

                {/* Right side - Form */}
                <div className="w-full md:w-1/2 p-4 md:p-8">
                    <h2 className="text-2xl font-bold mb-6 text-center">Create your account</h2>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Full Name"
                            className="w-full mb-3 px-4 py-2 rounded border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
                        />
                        <input
                            type="text"
                            name="passportNumber"
                            value={formData.passportNumber}
                            onChange={handleInputChange}
                            placeholder="Passport Number"
                            className="w-full mb-3 px-4 py-2 rounded border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
                        />
                        <input
                            type="text"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                            placeholder="Personal Phone Number"
                            className="w-full mb-3 px-4 py-2 rounded border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
                        />
                        <input
                            type="text"
                            name="homePhoneNumber"
                            value={formData.homePhoneNumber}
                            onChange={handleInputChange}
                            placeholder="Home Phone Number"
                            className="w-full mb-3 px-4 py-2 rounded border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
                        />
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Gmail"
                            className="w-full mb-3 px-4 py-2 rounded border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
                        />
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="Password"
                            className="w-full mb-3 px-4 py-2 rounded border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
                        />
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            placeholder="Confirm Password"
                            className="w-full mb-3 px-4 py-2 rounded border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
                        />
                        <input
                            type="text"
                            name="code"
                            value={formData.code}
                            onChange={handleInputChange}
                            placeholder="Enter Code"
                            className="w-full mb-3 px-4 py-2 rounded border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
                        />
                        <button
                            type="button"
                            onClick={handleGenerateCode}
                            disabled={isCodeLoading}
                            className="w-full mb-3 py-2 rounded bg-[#2176ae] text-white font-semibold hover:bg-[#185a8c] transition-colors disabled:bg-gray-400"
                        >
                            {isCodeLoading ? 'Generating...' : 'Generate Code'}
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-2 rounded bg-gray-800 text-white font-semibold hover:bg-[#444] transition-colors disabled:bg-gray-400"
                        >
                            {isLoading ? 'Submitting...' : 'Submit'}
                        </button>
                    </form>
                    <p className="text-sm text-gray-500 mt-3 text-center">Already have an account? <Link to="/login" className="text-[#2176ae] font-bold hover:text-[#185a8c]">Login</Link></p>
                </div>
            </motion.div>
        </div>
    )
}

export default Register
