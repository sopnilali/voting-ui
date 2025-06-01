import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setUser, logout } from '../features/auth/authslice';

const baseQuery = fetchBaseQuery(
  {
    baseUrl: 'https://voting-server-api.vercel.app/api',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {

      const token = (getState()).auth.token;
      if (token) {
        headers.set('Authorization', `${token}`)
      }
      return headers
    }
  })

const baseQueryWithRefreshToken = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    //* Send Refresh
    console.log('Sending refresh token');

    const res = await fetch('https://voting-server-api.vercel.app/api/auth/refresh-token', {
      method: 'POST',
      credentials: 'include',
    });

    const data = await res.json();

    if (data?.data?.accessToken) {
      const user = (api.getState()).auth.user;

      api.dispatch(
        setUser({
          user,
          token: data.data.accessToken,
        })
      );

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ['voters', 'users', 'candidates', 'elections', 'votes'],
  endpoints: () => ({})
})

