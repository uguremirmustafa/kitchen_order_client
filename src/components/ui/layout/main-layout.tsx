import { Outlet } from 'react-router-dom';
import NavigationBar from './navbar';

function MainLayout() {
  return (
    <>
      <NavigationBar />
      <main className="p-4">
        <Outlet />
      </main>
    </>
  );
}

export default MainLayout;
