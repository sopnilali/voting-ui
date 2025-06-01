import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FaBars, FaTimes, FaUser } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../Redux/features/auth/authslice'
import Cookies from 'js-cookie';
import { toast } from 'sonner'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const user = useSelector((state) => state.auth.user)

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setIsScrolled(true)
            } else {
                setIsScrolled(false)
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Close mobile menu when route changes
    useEffect(() => {
        setIsOpen(false)
    }, [location])

    const navLinks = [
        { path: '/', label: 'Home' },
        { path: '/about', label: 'About' },
        { path: '/services', label: 'Services' },
        { path: '/contact', label: 'Contact' },
        { path: user && '/dashboard', label: user && 'Dashboard' }
    ]

    const handleLogout = () => {
        Cookies.remove('accessToken')
        dispatch(logout())
        toast.success('Logout successful')
        navigate('/login')
    }

    return (
        <>
            {/* Main Navbar */}
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                isScrolled ? 'bg-white shadow-md' : 'bg-white '
            }`}>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <Link to="/" className="flex items-center space-x-2">
                            <span className={`text-xl font-bold ${isScrolled ? 'text-gray-800' : 'text-gray-800'}`}>
                                Voting System
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center justify-center flex-1 mx-4 lg:mx-8">
                            <div className="flex items-center space-x-4 lg:space-x-8">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.path}
                                        to={link.path}
                                        className={`${
                                            location.pathname === link.path
                                                ? 'text-blue-600 font-semibold'
                                                : isScrolled 
                                                    ? 'text-gray-600 hover:text-gray-900' 
                                                    : 'text-gray-800 hover:text-gray-200'
                                        } transition-colors text-sm lg:text-base relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-bottom-right after:scale-x-0 after:bg-blue-600 after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100 ${
                                            location.pathname === link.path ? 'after:scale-x-100' : ''
                                        }`}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Auth Buttons */}
                        <div className="hidden md:flex items-center">
                            {user ? (
                                <button 
                                    onClick={handleLogout}
                                    className="flex items-center space-x-2 px-3 lg:px-4 py-2 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors text-sm lg:text-base"
                                >
                                    <FaUser size={16} />
                                    <span>Logout</span>
                                </button>
                            ) : (
                                <Link 
                                    to="/login" 
                                    className={`flex items-center space-x-2 px-3 lg:px-4 py-2 rounded-full ${
                                        location.pathname === '/login'
                                            ? 'bg-blue-700'
                                            : 'bg-blue-600 hover:bg-blue-700'
                                    } text-white transition-colors text-sm lg:text-base`}
                                >    
                                    <FaUser size={16} />
                                    <span>Login</span>
                                </Link>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className={`md:hidden p-2 rounded-lg ${
                                isScrolled ? 'text-gray-600' : 'text-gray-600'
                            }`}
                        >
                            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Modal */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -100 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -100 }}
                        transition={{ duration: 0.3 }}
                        className="fixed top-20 left-0 right-0 bg-white shadow-lg md:hidden z-40"
                    >
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
                            <div className="flex flex-col items-center space-y-4">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.path}
                                        to={link.path}
                                        className={`text-center w-full text-base py-2 transition-colors ${
                                            location.pathname === link.path
                                                ? 'text-blue-600 font-semibold'
                                                : 'text-gray-600 hover:text-gray-900'
                                        }`}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                                {user ? (
                                    <button 
                                        onClick={handleLogout}
                                        className="flex items-center justify-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors w-full max-w-[200px] text-base"
                                    >
                                        <FaUser size={16} />
                                        <span>Logout</span>
                                    </button>
                                ) : (
                                    <Link
                                        to="/login"
                                        className={`flex items-center justify-center space-x-2 px-4 py-2 rounded-full text-white transition-colors w-full max-w-[200px] text-base ${
                                            location.pathname === '/login'
                                                ? 'bg-blue-700'
                                                : 'bg-blue-600 hover:bg-blue-700'
                                        }`}
                                    >
                                        <FaUser size={16} />
                                        <span>Login</span>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden"
                        onClick={() => setIsOpen(false)}
                    />
                )}
            </AnimatePresence>
        </>
    )
}

export default Navbar
