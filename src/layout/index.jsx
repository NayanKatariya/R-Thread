import { Outlet } from 'react-router-dom';
import { SidebarProvider  } from '../components/ui/sidebar';
import Header from './Header';
import { ThemeProvider } from '../components/ThemeProvider';
import { AppSidebar } from './Sidebar';

const Layout = () => {

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">


      <div className="flex h-screen overflow-hidden bg-white rounded-[30px] shadow-[0px_0px_50px_rgba(0,0,0,0.1)]">
        <SidebarProvider>
          <AppSidebar />
          <div className="flex flex-col relative flex-1 overflow-hidden ml-5 max-md:ml-0 max-md:w-full">
            <Header />
            <div className="flex-1 overflow-y-auto px-4 shadow-lg ">
              <Outlet />
            </div>
          </div>
        </SidebarProvider>
      </div>
    </ThemeProvider>
  );
};

export default Layout;
