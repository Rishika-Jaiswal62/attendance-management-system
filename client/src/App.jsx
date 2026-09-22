import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/auth/LoginPage';
import DashboardLayout from './components/layout/DashboardLayout';
import ProtectedRoute from './routes/ProtectedRoute';

import PunchInPage from './pages/employee/PunchInPage';
import PunchOutPage from './pages/employee/PunchOutPage';

import ManagerDashboard from './pages/manager/ManagerDashboard';
import OvertimeRequestsPage from './pages/manager/OvertimeRequestsPage';

import AdminDashboard from './pages/admin/AdminDashboard';
import UsersPage from './pages/admin/UsersPage';

import ReportsPage from './pages/reports/ReportsPage';

import MyAttendancePage from './pages/employee/MyAttendancePage';
import RegisterPage from './pages/auth/RegisterPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Employee */}
        <Route
          path="/employee"
          element={
            <ProtectedRoute allowedRoles={['employee']}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="punch-in" replace />} />
          <Route path="punch-in" element={<PunchInPage />} />
          <Route path="punch-out" element={<PunchOutPage />} />
            <Route path="my-attendance" element={<MyAttendancePage />} />
        </Route>

        {/* Manager */}
        <Route
          path="/manager"
          element={
            <ProtectedRoute allowedRoles={['manager']}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="team-attendance" replace />} />
          <Route path="team-attendance" element={<ManagerDashboard />} />
          <Route path="overtime-requests" element={<OvertimeRequestsPage />} />
          <Route path="reports" element={<ReportsPage />} />
        </Route>

        {/* Admin */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="all-attendance" replace />} />
          <Route path="all-attendance" element={<AdminDashboard />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="reports" element={<ReportsPage />} />
        </Route>

        

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;