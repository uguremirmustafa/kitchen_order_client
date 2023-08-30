import { Outlet } from 'react-router-dom';

function AuthLayout() {
  return (
    <main className="p-4 d-flex items-center justify-center">
      <Outlet />
    </main>
  );
}

export default AuthLayout;
