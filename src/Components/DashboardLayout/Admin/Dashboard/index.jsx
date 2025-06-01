import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useGetVoteCountQuery } from '../../../../Redux/features/vote/voteApi';
import { useGetAllVoterQuery } from '../../../../Redux/features/voter/voterApi';
import { useGetAllUserQuery } from '../../../../Redux/features/user/userApi';
import { useGetAllCandidateQuery } from '../../../../Redux/features/candidate/candidateApi';
import { useGetAllElectionQuery } from '../../../../Redux/features/election/electionApi';

const DashboardStats = () => {
  const { data: voteCount, isLoading: voteCountLoading, error: voteCountError } = useGetVoteCountQuery(undefined);
  const { data: voters, isLoading: votersLoading } = useGetAllVoterQuery(undefined);
  const { data: users, isLoading: usersLoading } = useGetAllUserQuery(undefined);
  const { data: candidates, isLoading: candidatesLoading } = useGetAllCandidateQuery(undefined);
  const { data: elections, isLoading: electionsLoading } = useGetAllElectionQuery(undefined);

  const votingDatas = voteCount?.data;
  const sampleVotingData = votingDatas?.map((data) => ({
    name: data.electionName,
    votes: data._count
  }));

  // Calculate voter distribution
  const totalVoters = voters?.data?.length || 0;
  const votedCount = voteCount?.data?.reduce((acc, curr) => acc + curr._count, 0) || 0;
  const pendingCount = totalVoters - votedCount;

  const voterDistribution = [
    { name: 'Registered', value: totalVoters },
    { name: 'Voted', value: votedCount },
    { name: 'Pending', value: pendingCount }
  ];

  const COLORS = ['#4B5563', '#6B7280', '#9CA3AF'];

  // Loading state for stats
  const isLoading = votersLoading || usersLoading || candidatesLoading || electionsLoading;

  return (
    <div className="">
      <h1 className="text-3xl font-bold text-gray-200 mb-8">Dashboard Overview</h1>
      
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-700">
          <h3 className="text-lg font-medium text-gray-300 mb-2">Total Voters</h3>
          {isLoading ? (
            <div className="animate-pulse h-8 bg-gray-700 rounded w-24"></div>
          ) : (
            <p className="text-3xl font-bold text-gray-100">{voters?.data?.length || 0}</p>
          )}
        </div>
        <div className="bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-700">
          <h3 className="text-lg font-medium text-gray-300 mb-2">Total Users</h3>
          {isLoading ? (
            <div className="animate-pulse h-8 bg-gray-700 rounded w-24"></div>
          ) : (
            <p className="text-3xl font-bold text-gray-100">{users?.data?.length || 0}</p>
          )}
        </div>
        <div className="bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-700">
          <h3 className="text-lg font-medium text-gray-300 mb-2">Candidates</h3>
          {isLoading ? (
            <div className="animate-pulse h-8 bg-gray-700 rounded w-24"></div>
          ) : (
            <p className="text-3xl font-bold text-gray-100">{candidates?.data?.length || 0}</p>
          )}
        </div>
        <div className="bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-700">
          <h3 className="text-lg font-medium text-gray-300 mb-2">Active Elections</h3>
          {isLoading ? (
            <div className="animate-pulse h-8 bg-gray-700 rounded w-24"></div>
          ) : (
            <p className="text-3xl font-bold text-gray-100">{elections?.data?.length || 0}</p>
          )}
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Voting Count Chart */}
        <div className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-gray-200 mb-4">Voting Count by Election</h2>
          <div className="h-[300px]">
            {voteCountLoading ? (
              <div className="h-full flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-200"></div>
              </div>
            ) : voteCountError ? (
              <div className="h-full flex items-center justify-center text-red-400">
                Error loading voting data
              </div>
            ) : (
              <ResponsiveContainer>
                <BarChart data={sampleVotingData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis 
                    dataKey="name" 
                    stroke="#9CA3AF"
                    textAnchor="end"
                    height={70}
                    interval={0}
                  />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937',
                      border: '1px solid #374151',
                      borderRadius: '0.5rem',
                      color: '#F3F4F6',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3)'
                    }}
                  />
                  <Legend wrapperStyle={{ color: '#9CA3AF' }} />
                  <Bar 
                    dataKey="votes" 
                    fill="#6B7280" 
                    radius={[4, 4, 0, 0]}
                    name="Total Votes"
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Voter Distribution Pie Chart */}
        <div className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-gray-200 mb-4">Voter Distribution</h2>
          <div className="h-[300px]">
            {isLoading ? (
              <div className="h-full flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-200"></div>
              </div>
            ) : (
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={voterDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#6B7280"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {voterDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937',
                      border: '1px solid #374151',
                      borderRadius: '0.5rem',
                      color: '#F3F4F6',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3)'
                    }}
                  />
                  <Legend wrapperStyle={{ color: '#9CA3AF' }} />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
