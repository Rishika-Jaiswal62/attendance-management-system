
import { useGetAllUsersQuery } from '../../features/user/userApiSlice';

const UsersPage = () => {
  const { data: users = [], isLoading, isError } = useGetAllUsersQuery();

  const roleBadge = (role) => {
    const styles = {
      admin: 'bg-purple-100 text-purple-700',
      manager: 'bg-blue-100 text-blue-700',
      employee: 'bg-gray-100 text-gray-600'
    };
    return `px-2.5 py-1 rounded-full text-xs font-medium capitalize ${styles[role] || 'bg-gray-100 text-gray-600'}`;
  };

  if (isLoading) return <div className="text-gray-500 text-sm">Loading users...</div>;
  if (isError) return <div className="text-red-600 text-sm">Failed to load users.</div>;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">All Users</h1>
        <p className="text-gray-500 text-sm mt-1">{users.length} registered users</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-left text-gray-500 text-xs uppercase tracking-wide">
                <th className="px-5 py-3 font-medium">Name</th>
                <th className="px-5 py-3 font-medium">Email</th>
                <th className="px-5 py-3 font-medium">Role</th>
                <th className="px-5 py-3 font-medium">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((u) => (
                <tr key={u._id} className="hover:bg-gray-50">
                  <td className="px-5 py-3 font-medium text-gray-800">{u.name}</td>
                  <td className="px-5 py-3 text-gray-600">{u.email}</td>
                  <td className="px-5 py-3">
                    <span className={roleBadge(u.role)}>{u.role}</span>
                  </td>
                  <td className="px-5 py-3 text-gray-500">
                    {new Date(u.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;