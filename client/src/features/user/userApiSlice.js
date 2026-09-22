import { apiSlice } from '../api/APISlice';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => '/users',
      providesTags: ['Users']
    })
  })
});

export const { useGetAllUsersQuery } = userApiSlice;