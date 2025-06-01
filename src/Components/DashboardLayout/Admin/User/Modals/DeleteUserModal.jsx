import React from 'react';
import { useDeleteUserMutation } from '../../../../../Redux/features/user/userApi';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

export const DeleteUserModal = ({ isOpen, onClose, selectedUser }) => {
  const [deleteUser] = useDeleteUserMutation();

  const handleDelete = async () => {
    try {
      const result = await deleteUser(selectedUser.id).unwrap();
      if (result) {
        toast.success('User deleted successfully');
        onClose();
      }
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to delete user');
    }
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
            <h3 className="text-xl font-bold text-gray-200 mb-4">Delete User</h3>
            <p className="text-gray-300 mb-6">
              Are you sure you want to delete {selectedUser.name}? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 rounded bg-gray-700 text-gray-300 hover:bg-gray-600"
              >
                Cancel
              </motion.button>
              <motion.button
                onClick={handleDelete}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
              >
                Delete
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DeleteUserModal; 