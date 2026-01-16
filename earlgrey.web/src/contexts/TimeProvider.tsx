import { useEffect, useState } from "react";
import { TimeContext } from "./TimeContext";

export function TimeProvider({ children }: { children: React.ReactNode }) {
    const [currentTime, setCurrentTime] = useState(() => new Date());

    useEffect(() => {
        const id = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(id);
    }, []);

    return <TimeContext.Provider value={currentTime}>
        {children}
    </TimeContext.Provider>

}
