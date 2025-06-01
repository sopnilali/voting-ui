import { baseApi } from "../../api/baseApi";

const electionApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
      createElection: builder.mutation({
        query: (electionInfo) => ({
          url: '/election/create',
          method: 'POST',
          body: electionInfo,
        }),
        invalidatesTags: ['elections'],
      }),
      getAllElection: builder.query({
        query: () => ({
          url: '/election',
          method: 'GET',
        }),
        providesTags: ['elections'],
      }),
      updateElection: builder.mutation({
        query: ({ id, data }) => ({
          url: `/election/${id}`,
          method: 'PUT',
          body: data,
        }),
        invalidatesTags: ['elections'],
      }),
      deleteElection: builder.mutation({
        query: ({ id }) => ({
          url: `/election/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['elections'],
      }),
    }),
  });
  
  export const { useCreateElectionMutation, useGetAllElectionQuery, useUpdateElectionMutation, useDeleteElectionMutation } = electionApi;