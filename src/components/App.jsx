import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { refreshUser } from 'redux/auth/operations';
import { Suspense, lazy, useEffect } from 'react';
import Layout from './Layout';
import PrivateRoute from './routs/PrivateRoute';
import PublicRoute from './routs/PublicRoute';
import ShowCircles from './ShowCircles/ShowCircles';
import { selectIsRefreshing } from 'redux/auth/selectors';
import Loader from './Loader/Loader';

const HomePage = lazy(() => import('../pages/HomePage'));
const RegisterPage = lazy(() => import('../pages/RegisterPage'));
const LoginPage = lazy(() => import('../pages/LoginPage'));
const Phonebook = lazy(() => import('../pages/Phonebook'));

export const App = () => {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);
  //When the page reloads, we check for the presence of the user
  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <Loader/>
  ) : (
    <Suspense fallback={<ShowCircles />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route
            path="register"
            element={
              <PublicRoute>
                <RegisterPage />
              </PublicRoute>
            }
          />
          <Route
            path="login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route
            path="phonebook"
            element={
              <PrivateRoute>
                <Phonebook />
              </PrivateRoute>
            }
          />
        </Route>
        <Route path="/*" element={<Layout />} />
      </Routes>
    </Suspense>
  );
};
