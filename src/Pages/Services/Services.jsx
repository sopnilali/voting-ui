import React from 'react';
import { motion } from 'framer-motion';
import { FiShield, FiUsers, FiCheckCircle, FiClock, FiLock, FiBarChart2, FiGlobe, FiSettings } from 'react-icons/fi';

const Services = () => {
  const services = [
    {
      icon: <FiShield className="w-8 h-8" />,
      title: "Secure Voting System",
      description: "Our platform employs state-of-the-art encryption and blockchain technology to ensure the integrity and security of every vote cast.",
      features: [
        "End-to-end encryption",
        "Blockchain verification",
        "Fraud prevention",
        "Audit trails"
      ]
    },
    {
      icon: <FiUsers className="w-8 h-8" />,
      title: "Voter Management",
      description: "Comprehensive voter registration and management system that makes it easy to maintain accurate voter records.",
      features: [
        "Digital registration",
        "Voter verification",
        "Status tracking",
        "Document management"
      ]
    },
    {
      icon: <FiCheckCircle className="w-8 h-8" />,
      title: "Election Administration",
      description: "Streamlined tools for election officials to create, manage, and monitor elections efficiently.",
      features: [
        "Election setup",
        "Candidate management",
        "Real-time monitoring",
        "Result verification"
      ]
    },
    {
      icon: <FiClock className="w-8 h-8" />,
      title: "24/7 Support",
      description: "Round-the-clock technical support and assistance for both voters and administrators.",
      features: [
        "Live chat support",
        "Email assistance",
        "Phone support",
        "Knowledge base"
      ]
    }
  ];

  const benefits = [
    {
      icon: <FiLock className="w-6 h-6" />,
      title: "Enhanced Security",
      description: "Advanced security measures protect the integrity of the voting process"
    },
    {
      icon: <FiBarChart2 className="w-6 h-6" />,
      title: "Real-time Analytics",
      description: "Comprehensive reporting and analytics for better decision-making"
    },
    {
      icon: <FiGlobe className="w-6 h-6" />,
      title: "Global Accessibility",
      description: "Access the platform from anywhere, on any device"
    },
    {
      icon: <FiSettings className="w-6 h-6" />,
      title: "Easy Integration",
      description: "Seamless integration with existing systems and workflows"
    }
  ];

  return (
    <div className="min-h-screen text-black py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h1>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            We provide comprehensive digital voting solutions designed to make the electoral process
            more secure, accessible, and efficient for everyone involved.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-100"
            >
              <div className="text-blue-600 mb-6">
                {service.icon}
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">{service.title}</h3>
              <p className="text-gray-600 mb-6">{service.description}</p>
              <ul className="space-y-3">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-gray-700">
                    <FiCheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-gray-50 rounded-2xl p-12 mb-16"
        >
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Key Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 * index }}
                className="text-center"
              >
                <div className="text-blue-600 mb-4 flex justify-center">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Get Started?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Join the growing number of organizations that trust our platform for their voting needs.
            Contact us today to learn more about our services and how we can help you.
          </p>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Contact Us
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Services;
