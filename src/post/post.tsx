import * as React from 'react';
import { Routes, Route } from 'react-router-dom';

import { PostList } from './list';

function Post() {
  return (
    <Routes>
      <Route path='' element={<PostList />}></Route>
    </Routes>
  );
}

export { Post };
