import { useUser } from './context/UserContext'
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Login from './pages/Login/'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import Error from './pages/Error'
import './App.css'
import PrivateRoutes from './components/PrivateRoutes/PrivateRoutes'

function App() {
  
  const { isAuth } = useUser();
  // const handleLogin = (userData) => {
  //   localStorage.setItem('user', JSON.stringify(userData));
  // }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={isAuth ? <Navigate to="/dashboard" replace /> : <Login />}/>
        <Route path="/" element={<PrivateRoutes auth={isAuth} />}>
          <Route element={<Layout />}>
            <Route path='/' element={<Navigate to="/dashboard" replace/>} />
            <Route path='/dashboard' element={<Dashboard />}/>
            <Route path='/profile' element={<Profile />} />
          </Route>
        </Route>
        <Route path='*' element={<Error />}/>
      </Routes>
    </Router>
  )
}

export default App
