import { Outlet } from 'react-router-dom';
import NavigationBar from './navbar';
import Modal from '../modals';
import { ModalWrapper } from 'components/wrappers/modal-wrapper';

function MainLayout() {
  return (
    <>
      <ModalWrapper>
        <Modal />
        <NavigationBar />
        <main className="p-4 container mx-auto">
          <Outlet />
        </main>
      </ModalWrapper>
    </>
  );
}

export default MainLayout;
