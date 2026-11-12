import { useUser } from '../../context/UserContext';
import { formatCreationDate } from '../../utils/dateUtils';
import styles from './UserInfos.module.css';

export default function UserInfos() {

  const { user } = useUser();

  const date = formatCreationDate(user.profile.createdAt);

  const profilePic = user.image;

  return (
    <div className={styles.profileContainer}>
      <img src={profilePic} alt={`Photo de profil de`} className={styles.picture}/>
      <div className={styles.profileInfo}>
        <h1>{user.profile.firstName} {user.profile.lastName}</h1>
        <p>Membre depuis le {date}</p>
      </div>
    </div>
  );
};