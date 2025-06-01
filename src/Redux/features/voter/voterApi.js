import { baseApi } from "../../api/baseApi";


const voterApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
      createVoter: builder.mutation({
        query: (voterInfo) => ({
          url: '/voter/register',
          method: 'POST',
          body: voterInfo,
        }),
        invalidatesTags: ['voters'],
      }),
      getAllVoter: builder.query({
        query: () => ({
          url: '/voter',
          method: 'GET',
        }),
        providesTags: ['voters'],
      }),
      updateVoter: builder.mutation({
        query: ({ id, voterInfo }) => ({
          url: `/voter/${id}`,
          method: 'PATCH',
          body: voterInfo,
        }),
        invalidatesTags: ['voters'], 
      }),
      deleteVoter: builder.mutation({
        query: ({ id }) => ({
          url: `/voter/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['voters'],
      }),
    }),
  });
  
  export const { useCreateVoterMutation, useGetAllVoterQuery, useUpdateVoterMutation, useDeleteVoterMutation } = voterApi;