import ProfileDashboard from "../../components/ProfileDashboard/ProfileDashboard";
import DistanceAverage from "../../components/DistanceAverage/DistanceAverage";
import styles from "./Dashboard.module.css"
import BPMAverage from "../../components/BPMAverage/BPMAverage";
import { displayCurrentWeekString, getCurrentWeekStats } from "../../utils/dateUtils";
import WeekGoals from "../../components/WeekGoals/WeekGoals";
import { useUser } from "../../context/UserContext";

export default function Dashboard() {

    const { user } = useUser();

    const currentWeek = displayCurrentWeekString();

    const { totalDistance, totalDuration } = user.statistics;

    return(
        <div className={styles.container}>
            <ProfileDashboard />
            <section>
                <h2>Vos dernières performances</h2>
                <div className={styles.chartsContainer}>
                    <DistanceAverage />
                    <BPMAverage />
                </div>
            </section>
            <section>
                <h2>Cette Semaine</h2>
                <p>{currentWeek}</p>
                <div className={styles.currentWeekContainer}>
                    <WeekGoals />
                    <div className={styles.weekStats}>
                        <div className={styles.weekDuration}>
                            <h4>Durée d'activité</h4>
                            <p>{totalDuration} minutes</p>
                        </div>
                        <div className={styles.weekDistance}>
                            <h4>Distance</h4>
                            <p>{totalDistance} kilomètres</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}