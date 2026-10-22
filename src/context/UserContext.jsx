import { Children, createContext, useContext, useState } from 'react';
import { loginUser } from '../../data/authService';

const UserContext = createContext();

export default function UserProvider({ children }) {

  const [user, setUser] = useState(() => {
    const currentUser = localStorage.getItem('user');
    if (currentUser) {
      return JSON.parse(currentUser);
    } else {
      return null;
    }
  })

  const [isAuth, setIsAuth] = useState(() => {
    const user = localStorage.getItem('user');
    return user ? true : false;
  })

  const login = async (username, password)=> {
      try {
          const response = await loginUser(username, password);

          setIsAuth(response.user);
          setIsAuth(true);
          localStorage.setItem('user', JSON.stringify(response));
      } catch (error) {
          console.log(error)
      }
    }

    const logout = () => {
      setUser(null)
      setIsAuth(false);
      localStorage.removeItem('user');
    }
  
  return (
    <UserContext.Provider value={{ user, isAuth, login, logout}}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser(){
  return useContext(UserContext);
}