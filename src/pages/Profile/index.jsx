import UserInfos from '../../components/UserInfos/UserInfos';
import { getAllStats, formatCreationDate } from '../../utils/dateUtils';
import { useUser } from '../../context/UserContext';
import styles from './Profile.module.css';

export default function Profile() {

  const { user } = useUser();

  const infos = user.userInfos;

  const formatHeight = (height) => {
    const meters = Math.floor(height / 100);
    const centimeters = String(height % 100).padStart(2, '0');
    return `${meters}m${centimeters}`
  }

  const userStats = getAllStats(user.runningData, infos.createdAt)

  return (
    <div className={styles.container}>
      <section className={styles.userSection}>
        <div className={styles.user}>
          <div className={styles.userInfos}>
            <UserInfos />
          </div>
          <div className={styles.yourProfile}>
            <h2>Votre profil</h2>
            <p>Âge : {infos.age}</p>
            <p>Genre : {infos.gender === "female" ? "femme" : "homme"}</p>
            <p>Taille : {formatHeight(infos.height)}</p>
            <p>Poids : {infos.weight}kg</p>
          </div>
        </div>
      </section>
      <section className={styles.statsSection}>
        <h2>Vos statistiques</h2>
        <p>depuis le {formatCreationDate(infos.createdAt)}</p>
        <div className={styles.statsDash}>
          <div className={styles.statsBox}>
            <h3>Temps total couru</h3>
            <p>{userStats.totalDuration} h</p>
          </div>
          <div className={styles.statsBox}>
            <h3>Calories brûlées</h3>
            <p>{userStats.totalCal} cal</p>
          </div>
          <div className={styles.statsBox}>
            <h3>Distance totale parcourue</h3>
            <p>{userStats.totalDistance} km</p>
          </div>
          <div className={styles.statsBox}>
            <h3>Nombre de jours de repos</h3>
            <p>{userStats.totalDaysOff} jours</p>
          </div>
          <div className={styles.statsBox}>
            <h3>Nombre de sessions</h3>
            <p>{userStats.totalSessions}</p>
          </div>
        </div>
      </section>
    </div>
  );
};