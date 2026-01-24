import { useEffect, useMemo, useState } from "react";
import useCurrentTime from "../../hooks/useCurrentTime"

export default function Calendar() {

    const now = useCurrentTime();

    const [today, setToday] = useState(new Date())

    useEffect(() => {
        if (today.getDay() !== now.getDay()) setToday(now);
    }, [now])

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

    const month = today.getMonth()
    const year = today.getFullYear();


    const weeks = useMemo(() => {

        let d = 1;
        const w = [];

        while (!Number.isNaN(new Date(`${month + 1}/${d}/${year}`).getDay())) {
            const weekday = new Date(`${month + 1}/${d++}/${year}`);

            if (w.length === 0 || weekday.getDay() === 0) {
                w.push(new Array(7).fill(undefined))
            }

            w[w.length - 1][weekday.getDay()] = weekday
        }
        return w;
    }, [today])

    return <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: "100%" }}>
        <div style={{ fontSize: "1.3em" }}>{months[month]} {year}</div>
        <div style={{ height: "75%", width: "75%", margin: "0% 10%", display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex' }}>
                {weekdays.map(w => <div style={{ flex: '1', textAlign: 'center', paddingTop: "20px" }}>
                    {w}
                </div>)}
            </div>
            {weeks.map(w =>
                <div style={{ flex: 1, display: 'flex' }}>
                    {w.map(d => <div style={{ flex: "1", border: d?.getDate() === today.getDate() ? "1px solid red" : "1px solid white" }}>
                        {d?.getDate()}
                    </div>)}
                </div>
            )}

        </div>

    </div>
}