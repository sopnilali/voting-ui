import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { useUpdateVoterMutation } from '../../../../../Redux/features/voter/voterApi';

export const UpdateVoterModal = ({ isOpen, onClose, selectedVoter }) => {
  const [updateVoter] = useUpdateVoterMutation();

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        dateOfBirth: e.target.dateOfBirth.value,
        nationalId: e.target.nationalId.value,
        isRegistered: e.target.isRegistered.value === 'true',
      };

      const result = await updateVoter({
        id: selectedVoter.id,
        voterInfo: formData,
      }).unwrap();

      if (result) {
        toast.success('Voter updated successfully');
        onClose();
      }
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to update voter');
    }
  };

  if (!selectedVoter) {
    return null;
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="bg-gray-800 rounded-lg p-8 max-w-md w-full"
          >
            <h3 className="text-xl font-bold text-gray-200 mb-4">Update Voter</h3>
            <form onSubmit={handleUpdate}>
              <div className="mb-4">
                <label className="block text-gray-300 mb-2">Date of Birth</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  defaultValue={new Date(selectedVoter.dateOfBirth).toISOString().split('T')[0]}
                  className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 text-gray-200 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-300 mb-2">National ID</label>
                <input
                  type="text"
                  name="nationalId"
                  defaultValue={selectedVoter.nationalId}
                  className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 text-gray-200 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-300 mb-2">Registration Status</label>
                <select
                  name="isRegistered"
                  defaultValue={selectedVoter.isRegistered.toString()}
                  className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 text-gray-200 focus:outline-none focus:border-blue-500"
                  required
                >
                  <option value="true">Registered</option>
                  <option value="false">Not Registered</option>
                </select>
              </div>
              <div className="flex justify-end space-x-4">
                <motion.button
                  type="button"
                  onClick={onClose}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 rounded bg-gray-700 text-gray-300 hover:bg-gray-600"
                >
                  Cancel
                </motion.button>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 rounded bg-gray-600 text-white hover:bg-gray-700"
                >
                  Update
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UpdateVoterModal; 