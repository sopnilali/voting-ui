import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiCalendar, FiArrowRight } from 'react-icons/fi';
import { useGetAllElectionQuery } from '../../../../Redux/features/election/electionApi';
import { Loader2 } from 'lucide-react';

const ElectionList = () => {
  const { data: elections, isLoading, error } = useGetAllElectionQuery(undefined);

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
          <div className="text-red-500 text-lg mb-2">Error Loading Elections</div>
          <p className="text-gray-400">{error?.data?.message || 'Something went wrong'}</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className=" ">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h2 className="text-2xl font-bold text-gray-200">Available Elections</h2>
        <p className="text-gray-400 mt-2">Browse and participate in upcoming elections</p>
      </motion.div>

      {elections?.data?.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center  py-12  rounded-lg mx-auto grid grid-cols-3"
        >
          <p className="text-gray-400">No elections found.</p>
        </motion.div>
      ) : (
        <ul className="space-y-4">
          {elections?.data?.map((election, index) => (
            <motion.li
              key={election.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-800 border max-w-xl  border-gray-700 p-6 rounded-lg shadow-lg hover:border-gray-600 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <Link 
                    to={`/dashboard/elections/${election.id}`}
                    className="text-xl font-semibold text-gray-200 hover:text-blue-400 transition-colors"
                  >
                    {election.title}
                  </Link>
                  <p className="text-gray-400 mt-2 mb-4">
                    {election.description}
                  </p>
                  <div className="flex items-center text-gray-400">
                    <FiCalendar className="mr-2" />
                    <span>
                      Voting period: {new Date(election.startDate).toLocaleDateString()} - {new Date(election.endDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <Link
                  to={`/dashboard/elections/${election.id}`}
                  className="ml-4 inline-flex items-center px-4 py-2 rounded-lg bg-gray-700 text-gray-200 hover:bg-gray-600 transition-colors"
                >
                  Candidates
                  <FiArrowRight className="ml-2" />
                </Link>
              </div>
            </motion.li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ElectionList;
