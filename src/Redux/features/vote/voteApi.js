import { baseApi } from "../../api/baseApi";

const voteApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
      submitVote: builder.mutation({
        query: (voteInfo) => ({
          url: '/vote/submit',
          method: 'POST',
          body: voteInfo,
        }),
        invalidatesTags: ['votes'],
      }),
      getVoteCount: builder.query({
        query: () => ({
          url: '/vote/count',
          method: 'GET',
        }),
        providesTags: ['votes'],
      }),
      getVoteByCandidateId: builder.query({
        query: (candidateId) => ({
          url: `/vote/list/${candidateId}`,
          method: 'GET',
        }),
        providesTags: ['votes'],
      }),
      getVoteStats: builder.query({
        query: () => ({
          url: '/vote/stats',
          method: 'GET',
        }),
        providesTags: ['votes'],
      }),
    }),
  });
  
  export const { useSubmitVoteMutation, useGetVoteCountQuery, useGetVoteByCandidateIdQuery, useGetVoteStatsQuery } = voteApi;