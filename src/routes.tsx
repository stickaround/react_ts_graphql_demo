import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './App';
import { Layout } from './core/components/Layout';
import { Auth } from './auth';
import { Post } from './post';

function PostRoutes() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path='/auth/*' element={<Auth />} />
          <Route path='/' element={<App />} />
          <Route path='/posts/*' element={<Post />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export { PostRoutes as Routes };
