import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import AppBar from './AppBar/AppBar';
import { Toaster } from 'react-hot-toast';
import Loader from './Loader/Loader';

const Layout = () => {
  return (
    <>
      <AppBar />
      <Suspense fallback={<Loader/>}>
        <main>
          <section>
            <Outlet />
            <Toaster position="top-right" reverseOrder={false} />
          </section>
        </main>
      </Suspense>
    </>
  );
};

export default Layout;
