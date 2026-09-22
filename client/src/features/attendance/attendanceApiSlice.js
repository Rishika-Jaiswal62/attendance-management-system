import { apiSlice } from '../api/APISlice';

export const attendanceApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    punchIn: builder.mutation({
      query: (data) => ({
        url: '/attendance/punch-in',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Attendance']
    }),
    punchOut: builder.mutation({
      query: (data) => ({
        url: '/attendance/punch-out',
        method: 'PUT',
        body: data
      }),
      invalidatesTags: ['Attendance']
    }),
    getMyAttendance: builder.query({
      query: () => '/attendance/my',
      providesTags: ['Attendance']
    }),
    getTeamAttendance: builder.query({
      query: () => '/attendance/team',
      providesTags: ['Attendance']
    }),
    getAllAttendance: builder.query({
      query: () => '/attendance/all',
      providesTags: ['Attendance']
    }),
    validateAttendance: builder.mutation({
      query: ({ attendanceId, ...data }) => ({
        url: `/attendance/validate/${attendanceId}`,
        method: 'PUT',
        body: data
      }),
      invalidatesTags: ['Attendance']
    }),
    requestOvertime: builder.mutation({
      query: (attendanceId) => ({
        url: `/overtime/request/${attendanceId}`,
        method: 'POST'
      }),
      invalidatesTags: ['Attendance']
    }),
    updateOvertimeStatus: builder.mutation({
      query: ({ attendanceId, status }) => ({
        url: `/overtime/update/${attendanceId}`,
        method: 'PUT',
        body: { status }
      }),
      invalidatesTags: ['Attendance']
    }),
    getReport: builder.query({
      query: (date) => `/report${date ? `?date=${date}` : ''}`,
      providesTags: ['Report']
    })
  })
});

export const {
  usePunchInMutation,
  usePunchOutMutation,
  useGetMyAttendanceQuery,
  useGetTeamAttendanceQuery,
  useGetAllAttendanceQuery,
  useValidateAttendanceMutation,
  useRequestOvertimeMutation,
  useUpdateOvertimeStatusMutation,
  useGetReportQuery
} = attendanceApiSlice;