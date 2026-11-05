import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import styles from './WeekGoals.module.css';
import { useUser } from '../../context/UserContext';
import { getCurrentWeekStats } from '../../utils/dateUtils';

export default function WeekGoals() {

  const { user } = useUser();

  const { sessionsCount } = getCurrentWeekStats(user.runningData);

  const remainingCount = 6 - sessionsCount;

  const data = [
    { name: 'réalisées', value: sessionsCount, fill: '#0000FF' },
    { name: 'restants', value: remainingCount, fill: '#C4C4FF' }
  ] 
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>x{sessionsCount} sur objectif de 6</h3>
        <p>Courses hebdomadaires réalisées</p>
      </div>
      <PieChart
          style={{ width: '100%', maxWidth: 300, maxHeight: '70vh', aspectRatio: 1 }}
          responsive
          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
      >
        <Pie 
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={40}
          outerRadius={80}
          startAngle={0}
          endAngle={-360}
          dataKey="value"
          cornerRadius={2}
          stroke='none'
        />
      </PieChart>
</div>
  );
};