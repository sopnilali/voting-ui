import React from 'react';
import { useUpdateUserMutation } from '../../../../../Redux/features/user/userApi';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

export const UpdateUserModal = ({ isOpen, onClose, selectedUser }) => {
  const [updateUser] = useUpdateUserMutation();

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const result = await updateUser({
        id: selectedUser.id,
        data: {
          name: e.target.name.value,
          email: e.target.email.value,
          role: e.target.role.value,
        },
      }).unwrap();

      if (result) {
        toast.success('User updated successfully');
        onClose();
      }
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to update user');
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
            <h3 className="text-xl font-bold text-gray-200 mb-4">Update User</h3>
            <form onSubmit={handleUpdate}>
              <div className="mb-4">
                <label className="block text-gray-300 mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={selectedUser.name}
                  className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 text-gray-200 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  defaultValue={selectedUser.email}
                  className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 text-gray-200 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-300 mb-2">Role</label>
                <select
                  name="role"
                  defaultValue={selectedUser.role}
                  className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 text-gray-200 focus:outline-none focus:border-blue-500"
                  required
                >
                  <option value="USER">User</option>
                  <option value="ADMIN">Admin</option>
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
                  className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
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

export default UpdateUserModal; 