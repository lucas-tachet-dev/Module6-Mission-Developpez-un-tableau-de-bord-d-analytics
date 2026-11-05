import { createContext, useContext, useEffect, useState } from 'react';
import {  } from '../../data/authService';
import { loginUser, fetchWithAuth } from '../services/api';
import { DateTime } from 'luxon';

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
    const auth = localStorage.getItem('user');
    return auth ? true : false;
  })

  // fonction pour lancer les fetchs
  const fetchAllUserData = async (token) => {
    const infos = await fetchWithAuth('/user-info', token);

    const profilePic = infos.profile.profilePicture;
    
    const now = DateTime.now().toISODate();
    const creationDate = infos.profile.createdAt;
    
    const image = await fetchWithAuth(`/images/${profilePic}`, token);
    const activity = await fetchWithAuth(`/user-activity?startWeek=${creationDate}&endWeek=${now}`, token);

    const fullUserData = {
      ...infos,
      image: image,
      runningData: activity
    };

    return fullUserData;
  }

  useEffect(() => {
    async function initAuth() {
      const token = localStorage.getItem('token');

      if (token) {
        try {
          const fullUserData = await fetchAllUserData(token);
          setUser(fullUserData);
          setIsAuth(true);
        } catch (error) {
          console.log(error);
          logout();
        }
      }
    }

    initAuth();
  },[])

  const login = async (username, password)=> {
      try {
          const response = await loginUser(username, password);
          
          localStorage.setItem('token', response.token);

          const fullUserData = await fetchAllUserData(response.token);

          setUser(fullUserData);
          setIsAuth(true);
          localStorage.setItem('user', JSON.stringify(fullUserData));

      } catch (error) {
          console.log(error)
      }
    }

    const logout = () => {
      setUser(null)
      setIsAuth(false);
      localStorage.removeItem('user');
      localStorage.removeItem('token')
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