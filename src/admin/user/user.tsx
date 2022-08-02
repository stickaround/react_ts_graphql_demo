import { Routes, Route } from 'react-router-dom';

import { UserList } from './list';
import { UserCreate } from './create';
import { UserUpdate } from './update';

function User() {
  return (
    <Routes>
      <Route path='' element={<UserList />}></Route>
      <Route path='create' element={<UserCreate />}></Route>
      <Route path=':id' element={<UserUpdate />}></Route>
    </Routes>
  );
}

export { User };
