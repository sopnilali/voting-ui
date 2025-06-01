import { baseApi } from "../../api/baseApi";

const candidateApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
      createCandidate: builder.mutation({
        query: (candidateInfo) => ({
          url: '/candidate/register',
          method: 'POST',
          body: candidateInfo,
        }),
        invalidatesTags: ['candidates'],
      }),
      getAllCandidate: builder.query({
        query: () => ({
          url: '/candidate',
          method: 'GET',
        }),
        providesTags: ['candidates'],
      }),

      getCandidateByElectionId: builder.query({
        query: (electionId) => ({
          url: `/candidate/list/${electionId}`,
          method: 'GET',
        }),
        providesTags: ['candidates'],
      }),

      updateCandidate: builder.mutation({
        query: ({ id, data }) => ({
          url: `/candidate/${id}`,
          method: 'PATCH',
          body: data,
        }),
        invalidatesTags: ['candidates'],
      }),

      deleteCandidate: builder.mutation({
        query: ({ id }) => ({
          url: `/candidate/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['candidates'],
      }),
    }),
  });
  
  export const { useCreateCandidateMutation, useGetAllCandidateQuery, useGetCandidateByElectionIdQuery, useUpdateCandidateMutation, useDeleteCandidateMutation } = candidateApi;