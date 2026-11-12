import { useUser } from '../../context/UserContext';
import { useState } from 'react';
import { getFourWeeksChartData, canGoPreviousWeeks } from '../../utils/dateUtils';
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts';
import { RechartsDevtools } from '@recharts/devtools';
import styles from './DistanceAverage.module.css';

export default function DistanceAverage() {

  const { user } = useUser();
  const [weekOffset, setWeekOffset] = useState(0);
  
  const { chartData, globalDateRange, averageDistance } = getFourWeeksChartData(user.runningData, weekOffset);

  const hasPrevious = canGoPreviousWeeks(user.profile.createdAt, weekOffset, "");

  const handlePreviousWeeks = () => {
    if(hasPrevious) {
      setWeekOffset(prev => prev + 4)
    }
  }

  const handleNextWeeks = () => {
    setWeekOffset(prev => (prev >= 4 ? prev - 4 : 0))
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>{averageDistance}km en moyenne</h3>
        <div className={styles.navigation}>
          <button onClick={handlePreviousWeeks}>{"<"}</button>
          <p>{globalDateRange}</p>
          <button onClick={handleNextWeeks}>{">"}</button>
        </div>
      </div>
      <p>Total des kilomètres 4 dernières semaines</p>
      <div className={styles.chart}>
        <BarChart
          style={{ width: '100%', maxHeight: '100vh', aspectRatio: 1}}
          responsive
          data={chartData}
          margin={{ top: 50, right: 0, left: 0, bottom: 0 }}
        >
          <CartesianGrid stroke="#94a3b8" strokeOpacity={0.5} vertical={false} strokeDasharray="5 5"/>
          <XAxis dataKey="week" stroke="#717171" />
          <YAxis stroke="#717171" />
          {/* Tooltip is HTML, so it takes `style` and `className` rather than SVG attributes.
          <Tooltip defaultIndex={2} /> */}
          <Bar
            dataKey="km"
            fill="#B6BDFC"
            fillOpacity={0.85}
            radius={8}
            barSize={14}
          />
          <RechartsDevtools />
        </BarChart>
      </div>
    </div>
  );
};