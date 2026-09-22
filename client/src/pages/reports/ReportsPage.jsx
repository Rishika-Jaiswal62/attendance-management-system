import { useState } from 'react';
import { useGetReportQuery } from '../../features/attendance/attendanceApiSlice';

const ReportsPage = () => {
  const [date, setDate] = useState('');
  const { data, isLoading, isError } = useGetReportQuery(date);

  const records = data?.report || [];

  return (
    <div>
      <div className="mb-6 flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Attendance Report</h1>
          <p className="text-gray-500 text-sm mt-1">{records.length} records found</p>
        </div>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {isLoading ? (
        <div className="text-gray-500 text-sm">Loading report...</div>
      ) : isError ? (
        <div className="text-red-600 text-sm">Failed to load report.</div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-left text-gray-500 text-xs uppercase tracking-wide">
                  <th className="px-5 py-3 font-medium">Name</th>
                  <th className="px-5 py-3 font-medium">Punch In</th>
                  <th className="px-5 py-3 font-medium">Punch Out</th>
                  <th className="px-5 py-3 font-medium">Hours</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium">Validation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {records.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-5 py-8 text-center text-gray-400">
                      No records found
                    </td>
                  </tr>
                ) : (
                  records.map((r, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="px-5 py-3 font-medium text-gray-800">{r.name}</td>
                      <td className="px-5 py-3 text-gray-600">
                        {r.punchInTime ? new Date(r.punchInTime).toLocaleString() : '-'}
                      </td>
                      <td className="px-5 py-3 text-gray-600">
                        {r.punchOutTime ? new Date(r.punchOutTime).toLocaleString() : '-'}
                      </td>
                      <td className="px-5 py-3 text-gray-600">{r.totalWorkingHours || 0} hrs</td>
                      <td className="px-5 py-3 text-gray-600">{r.status}</td>
                      <td className="px-5 py-3 text-gray-600">{r.validation}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportsPage;