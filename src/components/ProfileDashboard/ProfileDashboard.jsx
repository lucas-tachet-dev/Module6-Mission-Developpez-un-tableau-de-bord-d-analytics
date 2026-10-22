import { useUser } from '../../context/UserContext';
import styles from './ProfileDashboard.module.css';

export default function ProfileDashboard() {

  const { user } = useUser();

  const dateInit = new Date(user.userInfos.createdAt);
  const formattedDate = new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  const date = formattedDate.format(dateInit);

  const distanceList = user.runningData.map(running => running.distance);
  const totalDistance = distanceList.reduce((total, distance) => total + distance, 0)

  return (
    <div className={styles.container}>
        <div className={styles.profileContainer}>
          <img src="" alt={`Photo de profil de`} className='profile-pic'/>
          <div className={styles.profileInfo}>
            <h1>{user.userInfos.firstName} {user.userInfos.lastName}</h1>
            <p>Membre depuis le {date}</p>
          </div>
        </div>
        <div className={styles.distanceContainer}>
          <p>Distance totale parcourue</p>
          <div className={styles.distanceBox}>
            <img src="./public/Flag.png" alt="" />
            <span>{totalDistance} km</span>
          </div>
        </div>
    </div>
  );
};