import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useGetCandidateByElectionIdQuery } from '../../../../Redux/features/candidate/candidateApi';
import { useParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useSubmitVoteMutation } from '../../../../Redux/features/vote/voteApi';
import { toast } from 'sonner';

const VoteConfirmationModal = ({ isOpen, onClose, candidate, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
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
          className="bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4"
        >
          <h3 className="text-xl font-semibold text-gray-200 mb-4">Confirm Your Vote</h3>
          <p className="text-gray-400 mb-6">
            Are you sure you want to vote for <span className="text-blue-400 font-medium">{candidate.name}</span>? 
            This action cannot be undone.
          </p>
          <div className="flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-400 hover:text-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Confirm Vote
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const CandidateList = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: candidates, isLoading, error } = useGetCandidateByElectionIdQuery(id);
  console.log(candidates)

  const { user } = useSelector((state) => state.auth);

  const [submitVote, { isLoading: isSubmitting }] = useSubmitVoteMutation();
  
  const handleVoteClick = (candidate) => {
    setSelectedCandidate(candidate);
    setIsModalOpen(true);
  };

  const handleConfirmVote = async () => {
    setIsModalOpen(false);

    const voteData = {
      candidateId: selectedCandidate.id,
      electionId: id,
      voterId: user.id,
    };

    try {
      const response = await submitVote(voteData);
      toast.error(response.error.data.message);
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.error.data.message);
      }
    } catch (error) {
        
    }



  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center"
        >
          <Loader2 className="w-12 h-12 text-gray-500 animate-spin mb-4" />
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="text-red-500 text-lg mb-2">Error Loading Candidates</div>
          <p className="text-gray-400">{error?.data?.message || 'Something went wrong'}</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h2 className="text-2xl font-bold text-gray-200">Candidates</h2>
        <p className="text-gray-400 mt-2">Select a candidate to cast your vote</p>
      </motion.div>

      {candidates?.data?.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 bg-gray-800 rounded-lg"
        >
          <p className="text-gray-400">No candidates found for this election.</p>
        </motion.div>
      ) : (
        <div className="max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-6">
          {candidates?.data?.map((candidate, index) => (
            <motion.div
              key={candidate.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-800 border border-gray-700 p-6 rounded-lg shadow-lg hover:border-gray-600 transition-colors"
            >
              <h3 className="text-xl font-semibold text-gray-200 mb-4">{candidate.name}</h3>
              <div className="space-y-2 text-gray-400">
                <p className="flex items-center">
                  <span className="font-medium mr-2">Party:</span>
                  {candidate.party}
                </p>
                <p className="flex items-center">
                  <span className="font-medium mr-2">Age:</span>
                  {candidate.age}
                </p>
                <p className="flex items-center">
                  <span className="font-medium mr-2">Gender:</span>
                  {candidate.gender}
                </p>
                <p className="flex items-center">
                  <span className="font-medium mr-2">Education:</span>
                  {candidate.education}
                </p>
              </div>
              <button
                onClick={() => handleVoteClick(candidate)}
                className="mt-6 inline-flex items-center justify-center w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Vote
              </button>
            </motion.div>
          ))}
        </div>
      )}

      <VoteConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        candidate={selectedCandidate}
        onConfirm={handleConfirmVote}
      />
    </div>
  );
};

export default CandidateList;
