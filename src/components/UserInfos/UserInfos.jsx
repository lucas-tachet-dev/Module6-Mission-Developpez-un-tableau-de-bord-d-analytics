import { useUser } from '../../context/UserContext';
import { formatCreationDate } from '../../utils/dateUtils';
import styles from './UserInfos.module.css';

export default function UserInfos() {

  const { user } = useUser();

  const date = formatCreationDate(user.userInfos.createdAt);

  return (
    <div className={styles.profileContainer}>
      <img src="" alt={`Photo de profil de`} className='profile-pic'/>
      <div className={styles.profileInfo}>
        <h1>{user.userInfos.firstName} {user.userInfos.lastName}</h1>
        <p>Membre depuis le {date}</p>
      </div>
    </div>
  );
};