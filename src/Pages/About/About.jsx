import React from 'react';
import { motion } from 'framer-motion';
import { FiShield, FiUsers, FiCheckCircle, FiClock } from 'react-icons/fi';

const About = () => {
  const features = [
    {
      icon: <FiShield className="w-6 h-6" />,
      title: "Secure Voting",
      description: "Advanced encryption and blockchain technology ensure the integrity of every vote cast."
    },
    {
      icon: <FiUsers className="w-6 h-6" />,
      title: "User-Friendly",
      description: "Intuitive interface designed for voters of all technical abilities to participate easily."
    },
    {
      icon: <FiCheckCircle className="w-6 h-6" />,
      title: "Transparent Results",
      description: "Real-time vote counting and verification for complete transparency in the electoral process."
    },
    {
      icon: <FiClock className="w-6 h-6" />,
      title: "24/7 Availability",
      description: "Access the voting system anytime, anywhere, making participation more convenient."
    }
  ];

  return (
    <div className="min-h-screen text-black">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              About Our Voting Platform
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Empowering democracy through secure, transparent, and accessible digital voting solutions.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Our Mission</h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              We are committed to revolutionizing the voting process by providing a secure, 
              accessible, and transparent platform that ensures every voice is heard. Our 
              goal is to make voting more convenient while maintaining the highest standards 
              of security and integrity.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 * index }}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-100"
                >
                  <div className="text-blue-600 mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-100">
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Integrity</h3>
                <p className="text-gray-600">
                  We maintain the highest standards of honesty and transparency in all our operations.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-100">
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Innovation</h3>
                <p className="text-gray-600">
                  We continuously improve our platform with cutting-edge technology and best practices.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-100">
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Accessibility</h3>
                <p className="text-gray-600">
                  We ensure our platform is accessible to all voters, regardless of their technical expertise.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Get in Touch</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              Have questions about our platform? We're here to help. Contact us for more information
              about our services and how we can assist you.
            </p>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              Contact Us
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;
