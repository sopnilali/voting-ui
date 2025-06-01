import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiShield, FiUsers, FiCheckCircle, FiArrowRight } from 'react-icons/fi';

const Home = () => {
  const features = [
    {
      icon: <FiShield className="w-8 h-8" />,
      title: "Secure Voting",
      description: "Advanced encryption and blockchain technology ensure the integrity of every vote cast."
    },
    {
      icon: <FiUsers className="w-8 h-8" />,
      title: "Easy Registration",
      description: "Simple and quick voter registration process with instant verification."
    },
    {
      icon: <FiCheckCircle className="w-8 h-8" />,
      title: "Real-time Results",
      description: "Get instant access to election results with transparent vote counting."
    }
  ];

  const stats = [
    { number: "100K+", label: "Registered Voters" },
    { number: "500+", label: "Elections Conducted" },
    { number: "99.9%", label: "Uptime" },
    { number: "24/7", label: "Support" }
  ];

  return (
    <div className="min-h-screen ">
      {/* Hero Section */}
      <div className="relative">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-24 ">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                Secure Digital Voting Platform
              </h1>
              <p className="text-xl mb-8 text-gray-600">
                Experience the future of voting with our secure, transparent, and accessible
                digital voting platform. Make your voice heard with confidence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/register"
                  className="bg-gray-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors text-center shadow-lg"
                >
                  Get Started
                </Link>
                <Link
                  to="/about"
                  className="border-2 border-gray-900 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-center"
                >
                  Learn More
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="bg-gray-50 rounded-2xl p-8 shadow-2xl">
                <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg">
                  {/* Placeholder for hero image/video */}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Our platform combines cutting-edge technology with user-friendly design to
              create the most reliable digital voting experience.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
              >
                <div className="text-gray-900 mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-20 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center bg-white p-6 rounded-lg shadow-md border border-gray-100"
              >
                <div className="text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className=" py-20 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Ready to Get Started?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8 text-lg">
              Join thousands of voters who trust our platform for secure and transparent elections.
              Register now to participate in upcoming elections.
            </p>
            <Link
              to="/register"
              className="inline-flex items-center bg-gray-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors shadow-lg"
            >
              Register Now
              <FiArrowRight className="ml-2" />
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Home; 