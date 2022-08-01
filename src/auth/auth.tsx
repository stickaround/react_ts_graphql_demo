import { Routes, Route } from 'react-router-dom';

import { Login } from './login';
import { Register } from './register';

function Auth() {
  console.log('auth');
  return (
    <Routes>
      <Route path='login' element={<Login />}></Route>
      <Route path='register' element={<Register />}></Route>
    </Routes>
  );
}

export { Auth };
