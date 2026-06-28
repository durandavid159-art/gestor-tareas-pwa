import { useEffect, useState } from "react";

export const TimerDisplay = ({task}) => {

    const [seconds,
        setSeconds] =
        useState(task.timeSpent || 0);

    useEffect(() => {

        let interval;

        if (
            task.timerRunning &&
            task.startedAt
        ) {

            interval =
                setInterval(() => {

                    const started =
                        new Date(
                            task.startedAt
                        );

                    const now =
                        new Date();

                    const elapsed =
                        Math.floor(
                            (now - started)
                            / 1000
                        );

                    setSeconds(
                        task.timeSpent +
                        elapsed
                    );

                }, 1000);

        } else {

            setSeconds(
                task.timeSpent || 0
            );
        }

        return () =>
            clearInterval(interval);

    }, [task]);

    const hours =
        Math.floor(seconds / 3600);

    const minutes =
        Math.floor(
            (seconds % 3600)
            / 60
        );

    const secs =
        seconds % 60;

    return (

        <h4>

            Tiempo invertido:

            {" "}

            {hours
                .toString()
                .padStart(2, "0")}

            :

            {minutes
                .toString()
                .padStart(2, "0")}

            :

            {secs
                .toString()
                .padStart(2, "0")}

        </h4>

    );
};