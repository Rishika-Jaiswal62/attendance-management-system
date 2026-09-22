import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Sidebar = ({ isOpen, onClose }) => {
  const user = useSelector((state) => state.auth.user);

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
      isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
    }`;

  return (
    <>
      {/* Mobile overlay — dikhta hai sirf jab sidebar khula ho */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar itself */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-white border-r border-gray-200 flex flex-col z-40 transform transition-transform duration-200 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
      >
        <div className="px-5 py-5 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-900">AttendanceMS</h2>
            <p className="text-xs text-gray-400 mt-0.5 capitalize">{user?.role} Panel</p>
          </div>
          {/* Close button — sirf mobile pe dikhega */}
          <button onClick={onClose} className="lg:hidden text-gray-400 hover:text-gray-600 text-xl">
            ✕
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {user?.role === 'employee' && (
            <>
              <NavLink to="/employee/punch-in" className={linkClass} onClick={onClose}>Punch In</NavLink>
              <NavLink to="/employee/punch-out" className={linkClass} onClick={onClose}>Punch Out</NavLink>
              <NavLink to="/employee/my-attendance" className={linkClass} onClick={onClose}>My Attendance</NavLink>
            </>
          )}

          {user?.role === 'manager' && (
            <>
              <NavLink to="/manager/team-attendance" className={linkClass} onClick={onClose}>Team Attendance</NavLink>
              <NavLink to="/manager/overtime-requests" className={linkClass} onClick={onClose}>Overtime Requests</NavLink>
              <NavLink to="/manager/reports" className={linkClass} onClick={onClose}>Reports</NavLink>
            </>
          )}

          {user?.role === 'admin' && (
            <>
              <NavLink to="/admin/all-attendance" className={linkClass} onClick={onClose}>All Attendance</NavLink>
              <NavLink to="/admin/users" className={linkClass} onClick={onClose}>Users</NavLink>
              <NavLink to="/admin/reports" className={linkClass} onClick={onClose}>Reports</NavLink>
            </>
          )}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;