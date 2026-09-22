import { useState } from 'react';
import { useGetAllAttendanceQuery, useValidateAttendanceMutation } from '../../features/attendance/attendanceApiSlice';

const AdminDashboard = () => {
  const { data: records = [], isLoading, isError } = useGetAllAttendanceQuery();
  const [validateAttendance, { isLoading: isValidating }] = useValidateAttendanceMutation();
  const [selectedImage, setSelectedImage] = useState(null);
  const [remarksModal, setRemarksModal] = useState(null); // { attendanceId }
  const [remarksText, setRemarksText] = useState('');

  const statusBadge = (status) => {
    const styles = {
      Completed: 'bg-green-100 text-green-700',
      Incomplete: 'bg-yellow-100 text-yellow-700'
    };
    return `px-2.5 py-1 rounded-full text-xs font-medium ${styles[status] || 'bg-gray-100 text-gray-600'}`;
  };

  const validationBadge = (validation) => {
    const styles = {
      Valid: 'bg-green-100 text-green-700',
      Invalid: 'bg-red-100 text-red-700',
      Pending: 'bg-gray-100 text-gray-600'
    };
    return `px-2.5 py-1 rounded-full text-xs font-medium ${styles[validation] || 'bg-gray-100 text-gray-600'}`;
  };

  const markValid = async (attendanceId) => {
    try {
      await validateAttendance({ attendanceId, validation: 'Valid' }).unwrap();
    } catch (err) {
      alert(err?.data?.message || 'Failed to update');
    }
  };

  const submitInvalid = async () => {
    if (!remarksText.trim()) {
      alert('Remarks are required to mark as Invalid');
      return;
    }
    try {
      await validateAttendance({
        attendanceId: remarksModal.attendanceId,
        validation: 'Invalid',
        remarks: remarksText
      }).unwrap();
      setRemarksModal(null);
      setRemarksText('');
    } catch (err) {
      alert(err?.data?.message || 'Failed to update');
    }
  };

  if (isLoading) return <div className="text-gray-500 text-sm">Loading attendance data...</div>;
  if (isError) return <div className="text-red-600 text-sm">Failed to load data.</div>;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">All Attendance</h1>
        <p className="text-gray-500 text-sm mt-1">System-wide attendance monitoring</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-left text-gray-500 text-xs uppercase tracking-wide">
                <th className="px-5 py-3 font-medium">Employee</th>
                <th className="px-5 py-3 font-medium">Punch In</th>
                <th className="px-5 py-3 font-medium">Punch Out</th>
                <th className="px-5 py-3 font-medium">Hours</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Validation</th>
                <th className="px-5 py-3 font-medium">Selfie</th>
                <th className="px-5 py-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {records.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-5 py-8 text-center text-gray-400">
                    No attendance records found
                  </td>
                </tr>
              ) : (
                records.map((r) => (
                  <tr key={r._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3">
                      <p className="font-medium text-gray-800">{r.user?.name}</p>
                      <p className="text-xs text-gray-400">{r.user?.role}</p>
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
                    <td className="px-5 py-3">
                      <span className={validationBadge(r.validation)}>{r.validation}</span>
                    </td>
                    <td className="px-5 py-3">
                      {r.punchInSelfie ? (
                        <button
                          onClick={() => setSelectedImage(r.punchInSelfie)}
                          className="text-blue-600 hover:underline text-xs font-medium"
                        >
                          View
                        </button>
                      ) : (
                        <span className="text-gray-300 text-xs">-</span>
                      )}
                    </td>
                    <td className="px-5 py-3">
                      {r.validation === 'Pending' ? (
                        <div className="flex gap-2">
                          <button
                            onClick={() => markValid(r._id)}
                            disabled={isValidating}
                            className="text-green-600 hover:underline text-xs font-medium"
                          >
                            Valid
                          </button>
                          <button
                            onClick={() => setRemarksModal({ attendanceId: r._id })}
                            className="text-red-600 hover:underline text-xs font-medium"
                          >
                            Invalid
                          </button>
                        </div>
                      ) : (
                        <span className="text-gray-300 text-xs">Done</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selfie Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="bg-white rounded-xl p-4 max-w-sm w-full" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage} alt="Selfie" className="w-full rounded-lg" />
            <button
              onClick={() => setSelectedImage(null)}
              className="mt-3 w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 rounded-lg text-sm"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Invalid Remarks Modal */}
      {remarksModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl p-5 max-w-sm w-full">
            <h3 className="font-semibold text-gray-800 mb-3">Mark as Invalid</h3>
            <textarea
              value={remarksText}
              onChange={(e) => setRemarksText(e.target.value)}
              placeholder="Enter reason (e.g. selfie mismatch, location mismatch)"
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <div className="flex gap-2 mt-4">
              <button
                onClick={submitInvalid}
                disabled={isValidating}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white text-sm font-medium py-2 rounded-lg"
              >
                Confirm
              </button>
              <button
                onClick={() => {
                  setRemarksModal(null);
                  setRemarksText('');
                }}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;