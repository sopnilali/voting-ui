import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UpdateVoterModal, DeleteVoterModal } from './Modals';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { useGetAllVoterQuery } from '../../../../Redux/features/voter/voterApi';

const ManageVoter = () => {
  const { data: voters, isLoading, error } = useGetAllVoterQuery(undefined);
  const [selectedVoter, setSelectedVoter] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  console.log(voters);

  const handleUpdate = (voter) => {
    setSelectedVoter(voter);
    setIsUpdateModalOpen(true);
  };

  const handleDelete = (voter) => {
    setSelectedVoter(voter);
    setIsDeleteModalOpen(true);
  };

  const closeModals = () => {
    setIsUpdateModalOpen(false);
    setIsDeleteModalOpen(false);
    setIsAddModalOpen(false);
    setSelectedVoter(null);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4">
        Error loading voters: {error?.data?.message || 'Something went wrong'}
      </div>
    );
  }

  return (
    <div className="">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-200">Manage Voters</h2>
      </div>

      <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Voter ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Voter Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Date of Birth</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">National ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Registration Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700">
              {voters?.data?.map((voter, index) => (
                <motion.tr
                  key={voter.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="hover:bg-gray-700"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{voter?.userId}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{voter.user?.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {new Date(voter.dateOfBirth).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{voter.nationalId}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      voter.isRegistered 
                        ? 'bg-green-900 text-green-300' 
                        : 'bg-red-900 text-red-300'
                    }`}>
                      {voter.isRegistered ? 'Registered' : 'Not Registered'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    <div className="flex space-x-3">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleUpdate(voter)}
                        className="text-blue-400 hover:text-blue-300"
                      >
                        <FiEdit2 className="w-5 h-5" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDelete(voter)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <FiTrash2 className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <UpdateVoterModal
        isOpen={isUpdateModalOpen}
        onClose={closeModals}
        selectedVoter={selectedVoter}
      />

      <DeleteVoterModal
        isOpen={isDeleteModalOpen}
        onClose={closeModals}
        selectedVoter={selectedVoter}
      />
    </div>
  );
};

export default ManageVoter;
