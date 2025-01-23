import { Outlet } from 'react-router-dom';

import { Header } from './header';
import { Portal } from '@/shared/ui';
import { useMainLayoutModel } from './model/useMainLayoutModel';
import { Auth, CreateCat, Notifications, Register } from '@/widgets/pop-ups';

const MainLayout: React.FC = () => {
  const { authWindow, registerWindow, catWindow } = useMainLayoutModel();

  return (
    <>
      <Header />
      <Notifications />
      <div className="container">
        <main className="wrapper">
          <Outlet />
        </main>
      </div>
      <Portal>
        {authWindow && <Auth />}
        {registerWindow && <Register />}
        {catWindow && <CreateCat />}
      </Portal>
    </>
  );
};

export default MainLayout;
