import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './App';
import { Layout } from './core/components/Layout';
import { Auth } from './auth';
import { Post } from './post';
import { User } from './admin/user';
import { NotificationProvider } from './contexts/notificationContext';
import { Notification } from './core/components/Notification';

function PostRoutes() {
  return (
    <BrowserRouter>
      <NotificationProvider>
        <Layout>
          <Routes>
            <Route path='/auth/*' element={<Auth />} />
            <Route path='/' element={<App />} />
            <Route path='/posts/*' element={<Post />} />
            <Route path='/users/*' element={<User />} />
          </Routes>
          <Notification />
        </Layout>
      </NotificationProvider>
    </BrowserRouter>
  );
}

export { PostRoutes as Routes };
