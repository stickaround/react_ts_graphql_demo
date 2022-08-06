import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toast';

import App from './App';
import { Layout } from './core/components/Layout';
import { Login } from './auth/login';
import { Register } from './auth/register';
import { Post } from './post';
import { User } from './admin/user';
import { NotificationProvider } from './contexts/notificationContext';
import { Notification } from './core/components/Notification';

import { useGetProfileQuery } from './graphql/generated';

function PostRoutes() {
  const { data } = useGetProfileQuery();

  const mode =
    data?.getProfile?.data === null
      ? 'guest'
      : data?.getProfile?.data?.role === 'user'
      ? 'user'
      : 'admin';

  return mode === 'guest' ? (
    <BrowserRouter>
      <NotificationProvider>
        <Layout mode='guest'>
          <Routes>
            <Route path='/' element={<App />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
          <ToastContainer position='top-right' delay={2000} />
        </Layout>
      </NotificationProvider>
    </BrowserRouter>
  ) : mode === 'admin' ? (
    <BrowserRouter>
      <NotificationProvider>
        <Layout mode='admin'>
          <Routes>
            <Route path='/' element={<App />} />
            <Route path='/posts/*' element={<Post />} />
            <Route path='/users/*' element={<User />} />
          </Routes>
          <ToastContainer position='top-right' delay={2000} />
        </Layout>
      </NotificationProvider>
    </BrowserRouter>
  ) : (
    <BrowserRouter>
      <NotificationProvider>
        <Layout mode='user'>
          <Routes>
            <Route path='/' element={<App />} />
            <Route path='/posts/*' element={<Post />} />
          </Routes>
          <ToastContainer position='top-right' delay={2000} />
        </Layout>
      </NotificationProvider>
    </BrowserRouter>
  );
}

export { PostRoutes as Routes };
