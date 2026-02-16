import React, { useEffect } from 'react';
import NavBar from './components/NavBar';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import { useAuthStore } from './store/useAuthStore.js';
import Loader from './components/Loader.jsx';

import { Toaster } from 'react-hot-toast';
import { useThemeStore } from './store/useThemeStore.js';

function App() {
  const {authUser, checkAuth, isChecking, onlineUsers} = useAuthStore();
  const { theme } = useThemeStore();

  useEffect(() => {
    checkAuth();
  },[checkAuth]);
  console.log(onlineUsers);

  if(isChecking && !authUser) return <Loader/>
  
  return (
    <div data-theme={theme} className='font-montserrat'>
      <NavBar/>

      <Routes>
        <Route path='/' element={<Navigate to={authUser ? '/home' : '/login'}/>} />
        <Route path='/home' element={authUser ? <Home/> : <Navigate to={'/login'}/>} />
        <Route path='/register' element={!authUser ? <Register/> : <Navigate to={'/home'}/>} />
        <Route path='/login' element={!authUser ? <Login/> : <Navigate to={'/home'}/>}/>
        <Route path='/profile' element={authUser ? <Profile/> : <Navigate to={'/login'}/>} />
        <Route path='/settings' element={<Settings/>} />
      </Routes>

      <Toaster toastOptions={{ duration: 3333, position: "top-right"}} />
    </div>
  )
}

export default App