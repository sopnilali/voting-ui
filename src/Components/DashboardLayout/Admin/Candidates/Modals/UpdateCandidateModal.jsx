import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUpdateCandidateMutation } from '../../../../../Redux/features/candidate/candidateApi';
import { toast } from 'sonner';
import { useGetAllElectionQuery } from '../../../../../Redux/features/election/electionApi';

export const UpdateCandidateModal = ({ isOpen, onClose, selectedCandidate }) => {
  const [updateCandidate] = useUpdateCandidateMutation();

  const { data: elections } = useGetAllElectionQuery(undefined);

  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().slice(0, 16); // Format: YYYY-MM-DDTHH:mm
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        name: e.target.name.value,
        age: parseInt(e.target.age.value),
        gender: e.target.gender.value,
        education: e.target.education.value,
        party: e.target.party.value,
        electionId: e.target.electionId.value,
      };

      const result = await updateCandidate({
        id: selectedCandidate.id,
        data: formData,
      }).unwrap();

      if (result) {
        toast.success('Candidate updated successfully');
        onClose();
      }
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to update candidate');
    }
  };

  if (!selectedCandidate) {
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
            <h3 className="text-xl font-bold text-gray-200 mb-4">Update Candidate</h3>
            <form onSubmit={handleUpdate}>
              <div className="mb-4">
                <label className="block text-gray-300 mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={selectedCandidate.name}
                  className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 text-gray-200 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-300 mb-2">Age</label>
                <input
                  type="number"
                  name="age"
                  min="18"
                  max="100"
                  defaultValue={selectedCandidate.age}
                  className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 text-gray-200 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-300 mb-2">Gender</label>
                <select
                  name="gender"
                  defaultValue={selectedCandidate.gender}
                  className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 text-gray-200 focus:outline-none focus:border-blue-500"
                  required
                >
                  <option value="">Select gender</option>
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-300 mb-2">Education</label>
                <input
                  type="text"
                  name="education"
                  defaultValue={selectedCandidate.education}
                  className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 text-gray-200 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-300 mb-2">Party</label>
                <input
                  type="text"
                  name="party"
                  defaultValue={selectedCandidate.party}
                  className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 text-gray-200 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-300 mb-2">Election</label>
                <select
                  name="electionId"
                  defaultValue={selectedCandidate.electionId}
                  className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 text-gray-200 focus:outline-none focus:border-blue-500"
                  required
                >
                  <option value="">Select an election</option>
                  {elections?.data?.map((election) => (
                    <option key={election.id} value={election.id}>
                      {election.title} ({formatDateForInput(election.startDate)} - {formatDateForInput(election.endDate)})
                    </option>
                  ))}
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

export default UpdateCandidateModal; 