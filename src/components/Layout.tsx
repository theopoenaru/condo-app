import { Outlet } from 'react-router-dom';
import TopNav from './navigation/TopNav';

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <TopNav />
      <main className="flex-1 overflow-y-auto bg-background/95">
        <div className="container mx-auto p-6 max-w-7xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
}