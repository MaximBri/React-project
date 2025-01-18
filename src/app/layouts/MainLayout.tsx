import { Outlet } from 'react-router-dom';

import { Header } from './header';
import { Notifications } from '@/widgets/pop-ups';
import { useMainLayoutModel } from './model/useMainLayoutModel';

const MainLayout: React.FC = () => {
  useMainLayoutModel();

  return (
    <>
      <Header />
      <Notifications />
      <div className="container">
        <main className="wrapper">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default MainLayout;
