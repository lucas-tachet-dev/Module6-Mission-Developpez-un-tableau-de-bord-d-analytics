import { useUser } from '../../context/UserContext';
import { useState } from 'react';
import { canGoPreviousWeeks, getWeekBPMData } from '../../utils/dateUtils';
import { CartesianGrid, Line, Bar, LineChart, ComposedChart, XAxis, YAxis } from 'recharts';
import { RechartsDevtools } from '@recharts/devtools';
import styles from './BPMAverage.module.css';

export default function BPMAverage() {

  const { user } = useUser();
  const [weekOffset, setWeekOffset] = useState(0);

  const { chartData, globalDateRange, averageBPM } = getWeekBPMData(user.runningData, weekOffset);

  const hasPrevious = canGoPreviousWeeks(user.userInfos.createdAt, weekOffset, "week");

  const handlePreviousWeeks = () => {
    if(hasPrevious) {
      setWeekOffset(prev => prev + 1)
    }
  }

  const handleNextWeeks = () => {
    setWeekOffset(prev => (prev > 0 ? prev - 1 : 0))
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>{averageBPM} BPM</h3>
        <div className={styles.navigation}>
          <button onClick={handlePreviousWeeks}>{"<"}</button>
          <p>{globalDateRange}</p>
          <button onClick={handleNextWeeks}>{">"}</button>
        </div>
      </div>
      <p>Fréquence cardiaque moyenne</p>
      <div className={styles.charts}>
        <ComposedChart
          style={{ width: '100%', maxHeight: '100vh', aspectRatio: 1.21 }}
          responsive
          data={chartData}
          margin={{
            top: 30,
            right: 30,
            bottom: 5,
            left: 30,
          }}
        >
          <CartesianGrid stroke="#94a3b8" strokeOpacity={0.5} vertical={false} strokeDasharray="5 5" />
          <Line type="monotone" dataKey="average" strokeWidth={2} name="BPM" />
          <Bar dataKey="min" radius={20} fill='#FCC1B6'/>
          <Bar dataKey="max" radius={20} fill='#F4320B'/>
          <XAxis dataKey="day" />
          <YAxis width="auto" domain={[130, 180]} />
          <RechartsDevtools />
        </ComposedChart>
      </div>
    </div>
  );
};