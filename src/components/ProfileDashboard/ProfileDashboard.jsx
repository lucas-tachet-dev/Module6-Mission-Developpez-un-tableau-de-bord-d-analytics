import styles from './ProfileDashboard.module.css';

export default function ProfileDashboard() {

  return (
    <div className={styles.container}>
        <div className={styles.profileContainer}>
          <img src="" alt={`Photo de profil de`} className='profile-pic'/>
          <div className={styles.profileInfo}>
            <h1>Clara Dupont</h1>
            <p>Membre depuis le</p>
          </div>
        </div>
        <div className={styles.distanceContainer}>
          <p>Distance totale parcourue</p>
          <div className={styles.distanceBox}>
            <img src="./public/Flag.png" alt="" />
            <span>333 km</span>
          </div>
        </div>
    </div>
  );
};