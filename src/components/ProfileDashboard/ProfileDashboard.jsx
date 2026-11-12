import { useUser } from '../../context/UserContext';
import UserInfos from '../UserInfos/UserInfos';
import { calculateTotalDistance } from '../../utils/dateUtils';
import styles from './ProfileDashboard.module.css';

export default function ProfileDashboard() {

  const { user } = useUser();

  const totalDistance = user.statistics.totalDistance;

  return (
    <div className={styles.container}>
        <UserInfos />
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