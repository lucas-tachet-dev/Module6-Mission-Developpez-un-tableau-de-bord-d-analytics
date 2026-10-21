import Header from '../Header/Header';
import { Outlet } from 'react-router-dom';
import styles from './Layout.module.css';
import Footer from '../Footer/Footer';


export default function Layout({ onLogout }) {

  return (
    <>
      <Header onLogout={onLogout}/>
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};