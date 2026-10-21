import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Login from './pages/Login/'
import Dashboard from './pages/Dashboard'
//import Profile from './pages/Profile'
import './App.css'
import PrivateRoutes from './components/PrivateRoutes/PrivateRoutes'

function App() {
  const [isAuth, setIsAuth] = useState(() => {
    const user = localStorage.getItem('user');
    return user ? true : false;
  })

  console.log(isAuth)

  const handleLogin = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setIsAuth(true);
  }

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsAuth(false);
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<PrivateRoutes auth={isAuth} />}>
          <Route element={<Layout onLogout={handleLogout}/>}>
            <Route path='/' element={<Navigate to="/dashboard" replace/>} />
            <Route path='/dashboard' element={<Dashboard />}/>
          </Route>
        </Route>
        <Route path="/login" element={isAuth ? <Navigate to="/dashboard" replace /> : <Login onLogin={handleLogin}/>}/>
      </Routes>
    </Router>
  )
}

export default App
