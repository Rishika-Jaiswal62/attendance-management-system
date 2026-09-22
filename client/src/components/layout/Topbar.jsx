import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../features/auth/authSlice';

const Topbar = ({ onMenuClick }) => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-20">
      {/* Hamburger — sirf mobile/tablet pe dikhega */}
      <button onClick={onMenuClick} className="lg:hidden text-gray-500 text-2xl">
        ☰
      </button>

      <div className="hidden lg:block" />

      <div className="flex items-center gap-2 sm:gap-4">
        <div className="text-right hidden sm:block">
          <p className="text-sm font-medium text-gray-800">{user?.name}</p>
          <p className="text-xs text-gray-400">{user?.email}</p>
        </div>
        <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold text-sm shrink-0">
          {user?.name?.charAt(0).toUpperCase()}
        </div>
        <button
          onClick={handleLogout}
          className="text-sm text-red-600 hover:text-red-700 font-medium whitespace-nowrap"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Topbar;