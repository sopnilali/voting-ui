import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { FiUser, FiCalendar } from 'react-icons/fi';
import { useCreateVoterMutation } from '../../../../Redux/features/voter/voterApi';

const VoterRegisterForm = () => {
  const [registerVoter] = useCreateVoterMutation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = {
        nationalId: e.target.nationalId.value,
        dateOfBirth: e.target.dateOfBirth.value,
      };

      const result = await registerVoter(formData).unwrap();
      if (result) {
        toast.success('Voter registration successful');
        e.target.reset();
      }
    } catch (error) {
      toast.error(error?.data?.message || 'Registration failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-800 rounded-lg shadow-lg p-8"
      >
        <h2 className="text-2xl font-bold text-gray-200 mb-6 text-center">Voter Registration</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-gray-300 text-sm font-medium">
              National ID
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiUser className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                name="nationalId"
                maxLength={10}
                placeholder="Enter your National ID"
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-gray-200 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                required
                pattern="[0-9]{10}"
                title="Please enter a valid 10-digit National ID"
              />
            </div>
            <p className="text-gray-400 text-xs mt-1">
              Enter your 10-digit National ID number
            </p>
          </div>

          <div className="space-y-2">
            <label className="block text-gray-300 text-sm font-medium">
              Date of Birth
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiCalendar className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="date"
                name="dateOfBirth"
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-gray-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                required
                max={new Date().toISOString().split('T')[0]}
              />
            </div>
            <p className="text-gray-400 text-xs mt-1">
              Select your date of birth
            </p>
          </div>

          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full py-3 px-4 rounded-lg text-white font-medium ${
              isSubmitting
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-gray-600 hover:bg-gray-700'
            }`}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                Registering...
              </div>
            ) : (
              'Register as Voter'
            )}
          </motion.button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm">
            By registering, you agree to our terms and conditions
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default VoterRegisterForm;
