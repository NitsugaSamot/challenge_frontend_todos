import { ReactNode } from 'react';
import Header from '@/components/header/header';
import Aside from '@/components/aside/aside'

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <>
      <div className='bg-gray-100'>
        <Header />

        <div className='md:flex md:min-h-screen'>
          <Aside/>

          <main className='p-10 flex-1 '>
            {children}
          </main>
        </div>
      </div>
    </>
  );
};

export default AppLayout;