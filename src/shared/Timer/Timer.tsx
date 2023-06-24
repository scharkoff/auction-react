import React from 'react';
import styles from './Timer.module.scss';

interface ITimer {
    startTime: string;
    endTime: string;
}

export function Timer({ startTime, endTime }: ITimer) {
    const [remainingTime, setRemainingTime] = React.useState('00:00:00:00');

    React.useEffect(() => {
        const interval = setInterval(() => {
            const currentTime = new Date().getTime();
            const start = new Date(startTime).getTime();
            const end = new Date(endTime).getTime();

            if (currentTime >= end) {
                clearInterval(interval);
                setRemainingTime('00:00:00:00');
            } else if (currentTime >= start) {
                const difference = end - currentTime;
                const days = Math.floor(difference / (1000 * 60 * 60 * 24))
                    .toString()
                    .padStart(2, '0');
                const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
                    .toString()
                    .padStart(2, '0');
                const minutes = Math.floor((difference / (1000 * 60)) % 60)
                    .toString()
                    .padStart(2, '0');
                const seconds = Math.floor((difference / 1000) % 60)
                    .toString()
                    .padStart(2, '0');

                setRemainingTime(`${days}:${hours}:${minutes}:${seconds}`);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [startTime, endTime]);

    return (
        <div className={styles.wrapper}>
            <p className={styles.time}>{remainingTime}</p>
        </div>
    );
}

export default Timer;
