import { useGetTeamAttendanceQuery, useUpdateOvertimeStatusMutation } from '../../features/attendance/attendanceApiSlice';




const OvertimeRequestsPage = () => {
  const { data: records = [], isLoading } = useGetTeamAttendanceQuery();
  const [updateStatus, { isLoading: isUpdating }] = useUpdateOvertimeStatusMutation();

  const pendingRequests = records.filter((r) => r.overtimeRequested && r.overtimeStatus === 'Pending');

  const handleAction = async (attendanceId, status) => {
    try {
      await updateStatus({ attendanceId, status }).unwrap();
    } catch (err) {
      alert(err?.data?.message || 'Action failed');
    }
  };

  if (isLoading) {
    return <div className="text-gray-500 text-sm">Loading overtime requests...</div>;
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Overtime Requests</h1>
        <p className="text-gray-500 text-sm mt-1">Pending approvals from your team</p>
      </div>

      {pendingRequests.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-8 text-center text-gray-400 text-sm">
          No pending overtime requests
        </div>
      ) : (
        <div className="space-y-3">
          {pendingRequests.map((r) => (
            <div
              key={r._id}
              className="bg-white rounded-xl border border-gray-200 p-4 flex items-center justify-between"
            >
              <div>
                <p className="font-medium text-gray-800">{r.user?.name}</p>
                <p className="text-xs text-gray-400">
                  {new Date(r.createdAt).toLocaleDateString()} · {r.totalWorkingHours || 0} hrs worked
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleAction(r._id, 'Approved')}
                  disabled={isUpdating}
                  className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleAction(r._id, 'Rejected')}
                  disabled={isUpdating}
                  className="bg-red-50 hover:bg-red-100 text-red-600 text-sm font-medium px-4 py-2 rounded-lg transition-colors"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OvertimeRequestsPage;