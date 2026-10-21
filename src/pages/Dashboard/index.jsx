import ProfileDashboard from "../../components/ProfileDashboard/ProfileDashboard";
import styles from "./Dashboard.module.css"

export default function Dashboard() {
    return(
        <div className={styles.container}>
            <ProfileDashboard />
        </div>
    )
}