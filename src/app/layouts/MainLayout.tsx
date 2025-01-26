import { Outlet } from 'react-router-dom';
import { memo } from 'react';

import { Header } from './header';
import { useMainLayoutModel } from './model/useMainLayoutModel';
import { Notifications } from '@/widgets/pop-ups';
import { AppPortals } from './portals/AppPortals';

const MainLayout: React.FC = memo(() => {
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
      <AppPortals />
    </>
  );
});

export default MainLayout;
