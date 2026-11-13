import { DateTime } from 'luxon';

// calcul de la distance totale entre la création du compte et aujourd'hui
export function calculateTotalDistance(runningData, createdAt) {

    if(!runningData || !createdAt) 
        return 0;

    const creationDate = DateTime.fromISO(createdAt);
    const today = DateTime.now();
    const filterData = runningData.filter(run => {
      const runDate = DateTime.fromISO(run.date);
      return runDate >= creationDate && runDate <= today;
    })
    const totalDistance = filterData.reduce((total, run) => total + run.distance, 0)

    return Math.round(totalDistance)
}

export function getAllStats(runningData, createdAt) {
    if(!runningData || !createdAt) return {totalDistance: 0, totalDuration: 0, totalSessions:0, totalCal:0, totalDaysOff: 0}

    const creationDate = DateTime.fromISO(createdAt);
    const today = DateTime.now();;

    const filterData = runningData.filter(run => {
      const runDate = DateTime.fromISO(run.date);
      return runDate >= creationDate && runDate <= today;
    });

    const totalDistance = Math.round(filterData.reduce((total, run) => total + run.distance, 0));
    const totalDuration = Math.round(filterData.reduce((total, run) => total + run.duration, 0));
    const totalSessions = filterData.length;
    const totalCal = filterData.reduce((total, run) => total + run.caloriesBurned, 0)


    //calcul des jours de repos
    const start = creationDate.startOf('day');
    const end = today.endOf('day');

    const totalDays = Math.floor(end.diff(start, 'days').days) + 1;

    // verif si plusieurs sessions dans une journée
    const runDaysSet = new Set(
        runningData.map(run => DateTime.fromISO(run.date).toISODate())
        .filter(dateStr => {
            const d = DateTime.fromISO(dateStr);
            return d >= start && d <= end;
        })
    );

    const activeDaysCount = runDaysSet.size;

    const totalDaysOff = totalDays - activeDaysCount;

    return {
        totalDistance, 
        totalDuration,
        totalSessions,
        totalCal,
        totalDaysOff
    }
}

// récup des stats de la semaine actuelle
export function getCurrentWeekStats(runningData) {
    if(!runningData) return {weekDistance: 0, weekDuration: 0, sessionsCount: 0}

    const now = DateTime.now();
    const startOfWeek = now.startOf('week');
    const endOfWeek = now.endOf('week');

    const currentWeekRuns = runningData.filter(run => {
        const runDate = DateTime.fromISO(run.date)
        return runDate >= startOfWeek && runDate <= endOfWeek;
    })

    const weekDistance = currentWeekRuns.reduce((total, run) => total + run.distance, 0);
    const weekDuration = currentWeekRuns.reduce((total, run) => total + run.duration, 0);

    return {
        weekDistance,
        weekDuration,
        sessionsCount: currentWeekRuns.length
    }
}

// Affichage des dates de la semaine

export function displayCurrentWeekString() {
    const now = DateTime.now();
    const startOfWeek = now.startOf('week');
    const endOfWeek = now.endOf('week');

    const formatStart = startOfWeek.setLocale('fr').toFormat('d/MM/yy');
    const formatEnd = endOfWeek.setLocale('fr').toFormat('d/MM/yy');

    return `du ${formatStart} au ${formatEnd}`
}

// Récup des distances sur 4 semaines

export function getFourWeeksChartData(runningData, weekOffset = 0) {
    if (!runningData) return {chartData : [], globalDateRange : "", averageDistance: 0};

    const now = DateTime.now();
    const fourWeeksData = [];

    let s1Start = null;
    let s4End = null;

    for(let i = 3; i >= 0; i--) {
        const targetWeek = now.minus({ weeks : weekOffset + i});
        const startofWeek = targetWeek.startOf('week');
        const endOfWeek = targetWeek.endOf('week');

        if (i === 3) s1Start = startofWeek;
        if (i === 0) s4End = endOfWeek;

        // attribution des labels
        const weekIndex = 4 - i;
        const label = `S${weekIndex}`;

        // filtrage des courses de la semaine
        const weekRuns = runningData.filter(run => {
            const runDate = DateTime.fromISO(run.date);
            return runDate >= startofWeek && runDate <= endOfWeek;
        })

        const totalDistance = Math.round(
            weekRuns.reduce((total, run) => total + run.distance, 0)
        )

        fourWeeksData.push({
            week: label,
            km: totalDistance
        });
    }

    // calcul de la moyenne des 4 semaines
    const totalWeeks = fourWeeksData.reduce((total, weekData) => total + weekData.km, 0);
    const averageDistance = Math.round(totalWeeks / fourWeeksData.length);

    // formatage de la plage de semaines
    const startDateFormatted = s1Start.setLocale('fr').toFormat('d MMM');
    const endDateFormatted = s4End.setLocale('fr').toFormat('d MMM');
    const globalDateRange = `${startDateFormatted} - ${endDateFormatted}`;

    return {
        chartData: fourWeeksData,
        globalDateRange,
        averageDistance
    };
}

// Récup des BPM (min, max, average)

export function getWeekBPMData(runningData, weekOffset = 0) {
    if (!runningData) return {chartData : [], globalDateRange : "", averageBPM: 0};

    const now = DateTime.now();
    const targetWeek = now.minus({ weeks : weekOffset });
    const startOfWeek = targetWeek.startOf('week');
    const endOfWeek = targetWeek.endOf('week');

    const weekData = [];
    let currentDay = startOfWeek;

    for(let i = 0; i < 7; i++) {

        // Nom du jour
        const rawDayName = currentDay.setLocale('fr').toFormat('ccc');
        const dayName = rawDayName.charAt(0).toUpperCase() + rawDayName.slice(1).replace('.','')

        // filtrage des courses de la semaine
        const dayRun = runningData.find(run => {
            const runDate = DateTime.fromISO(run.date);
            return runDate.hasSame(currentDay, 'day');
        })
        
        const min = dayRun?.heartRate?.min ?? 0;
        const max = dayRun?.heartRate?.max ?? 0;
        const average = dayRun?.heartRate?.average ?? 0;

        weekData.push({
            day: dayName,
            min: min,
            max: max,
            average: average
        });

        currentDay = currentDay.plus({ days: 1 })
    }

    const validAverages = weekData.map(d => d.average).filter(avg => avg > 0);
    
    const averageBPM = validAverages.length > 0
        ? Math.round(validAverages.reduce((acc, curr) => acc + curr, 0) / validAverages.length)
        : 0;

    // formatage de la plage de semaines
    const startDateFormatted = startOfWeek.setLocale('fr').toFormat('d MMM');
    const endDateFormatted = endOfWeek.setLocale('fr').toFormat('d MMM');
    const globalDateRange = `${startDateFormatted} - ${endDateFormatted}`;

    return {
        chartData: weekData,
        globalDateRange,
        averageBPM
    };
}

// verif s'il existe encore des semaines à afficher
export function canGoPreviousWeeks(createdAt, weekOffset, unit) {
    if (!createdAt) return false;

    const now = DateTime.now();
    const creationDate = DateTime.fromISO(createdAt).startOf('week');

    const i = unit === "week" ? 1: 3;

    const oldestVisibleWeek = now.minus({ weeks: weekOffset + i }).startOf('week');

    return oldestVisibleWeek >= creationDate;
}

//formatage de la date brute vers date fr
export function formatCreationDate(date) {
    if (!date) return '';
    const dateObj = DateTime.fromISO(date);
    return dateObj.setLocale('fr').toFormat("d MMMM yyyy");
}