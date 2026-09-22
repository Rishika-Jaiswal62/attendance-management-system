import { useGetMyAttendanceQuery, useRequestOvertimeMutation } from '../../features/attendance/attendanceApiSlice';

const MyAttendancePage = () => {
  const { data: records = [], isLoading, isError } = useGetMyAttendanceQuery();
  const [requestOvertime, { isLoading: isRequesting }] = useRequestOvertimeMutation();

  const statusBadge = (status) => {
    const styles = {
      Completed: 'bg-green-100 text-green-700',
      Incomplete: 'bg-yellow-100 text-yellow-700'
    };
    return `px-2.5 py-1 rounded-full text-xs font-medium ${styles[status] || 'bg-gray-100 text-gray-600'}`;
  };

  const handleRequestOvertime = async (attendanceId) => {
    try {
      await requestOvertime(attendanceId).unwrap();
    } catch (err) {
      alert(err?.data?.message || 'Failed to request overtime');
    }
  };

  if (isLoading) return <div className="text-gray-500 text-sm">Loading your attendance...</div>;
  if (isError) return <div className="text-red-600 text-sm">Failed to load attendance.</div>;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Attendance</h1>
        <p className="text-gray-500 text-sm mt-1">{records.length} records found</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-left text-gray-500 text-xs uppercase tracking-wide">
                <th className="px-5 py-3 font-medium">Date</th>
                <th className="px-5 py-3 font-medium">Punch In</th>
                <th className="px-5 py-3 font-medium">Punch Out</th>
                <th className="px-5 py-3 font-medium">Hours</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Overtime</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {records.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-5 py-8 text-center text-gray-400">
                    No attendance records yet
                  </td>
                </tr>
              ) : (
                records.map((r) => (
                  <tr key={r._id} className="hover:bg-gray-50">
                    <td className="px-5 py-3 text-gray-600">
                      {new Date(r.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-5 py-3 text-gray-600">
                      {r.punchInTime ? new Date(r.punchInTime).toLocaleTimeString() : '-'}
                    </td>
                    <td className="px-5 py-3 text-gray-600">
                      {r.punchOutTime ? new Date(r.punchOutTime).toLocaleTimeString() : '-'}
                    </td>
                    <td className="px-5 py-3 text-gray-600">{r.totalWorkingHours || 0} hrs</td>
                    <td className="px-5 py-3">
                      <span className={statusBadge(r.status)}>{r.status}</span>
                    </td>
                    <td className="px-5 py-3 text-xs">
                      {r.overtimeRequested ? (
                        <span className="text-gray-500">{r.overtimeStatus}</span>
                      ) : r.punchOutTime ? (
                        <button
                          onClick={() => handleRequestOvertime(r._id)}
                          disabled={isRequesting}
                          className="text-blue-600 hover:underline font-medium"
                        >
                          Request Overtime
                        </button>
                      ) : (
                        <span className="text-gray-300">-</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyAttendancePage;