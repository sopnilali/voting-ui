import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { useUpdateElectionMutation } from '../../../../../Redux/features/election/electionApi';

export const UpdateElectionModal = ({ isOpen, onClose, selectedElection }) => {
  const [updateElection] = useUpdateElectionMutation();

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      // Format dates to ISO string
      const startDate = new Date(e.target.startDate.value).toISOString();
      const endDate = new Date(e.target.endDate.value).toISOString();

      const formData = {
        title: e.target.title.value,
        description: e.target.description.value,
        startDate,
        endDate,
        status: e.target.status.value,
      };

      const result = await updateElection({
        id: selectedElection.id,
        data: formData,
      }).unwrap();

      if (result) {
        toast.success('Election updated successfully');
        onClose();
      }
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to update election');
    }
  };

  // Format dates for input fields
  const formatDateForInput = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().slice(0, 16); // Format: YYYY-MM-DDTHH:mm
  };

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
            <h3 className="text-xl font-bold text-gray-200 mb-4">Update Election</h3>
            <form onSubmit={handleUpdate}>
              <div className="mb-4">
                <label className="block text-gray-300 mb-2">Title</label>
                <input
                  type="text"
                  name="title"
                  defaultValue={selectedElection.title}
                  className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 text-gray-200 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-300 mb-2">Description</label>
                <textarea
                  name="description"
                  rows="3"
                  defaultValue={selectedElection.description}
                  className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 text-gray-200 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-300 mb-2">Start Date</label>
                <input
                  type="datetime-local"
                  name="startDate"
                  defaultValue={formatDateForInput(selectedElection.startDate)}
                  className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 text-gray-200 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-300 mb-2">End Date</label>
                <input
                  type="datetime-local"
                  name="endDate"
                  defaultValue={formatDateForInput(selectedElection.endDate)}
                  className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 text-gray-200 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-300 mb-2">Status</label>
                <select
                  name="status"
                  defaultValue={selectedElection.status}
                  className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 text-gray-200 focus:outline-none focus:border-blue-500"
                  required
                >
                  <option value="UPCOMING">Upcoming</option>
                  <option value="ACTIVE">Active</option>
                  <option value="COMPLETED">Completed</option>
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

export default UpdateElectionModal; 