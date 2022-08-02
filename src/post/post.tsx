import { Routes, Route } from 'react-router-dom';

import { PostList } from './list';
import { PostCreate } from './create';
import { PostUpdate } from './update';

function Post() {
  return (
    <Routes>
      <Route path='' element={<PostList />}></Route>
      <Route path='create' element={<PostCreate />}></Route>
      <Route path=':id' element={<PostUpdate />}></Route>
    </Routes>
  );
}

export { Post };
