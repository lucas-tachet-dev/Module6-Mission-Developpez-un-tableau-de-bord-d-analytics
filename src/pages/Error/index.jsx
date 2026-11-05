import styles from './Error.module.css';
import { useNavigate } from 'react-router-dom';

export default function Error() {

  const navigate = useNavigate();

  return (
    <div className={styles.container}>
        <h1>404 - Page non trouvée</h1>
        <p>La page que vous cherchez n'existe plus ou est introuvable</p>
        <button onClick={() => navigate('/')}>Retour à la page d'accueil</button>
    </div>
  );
};