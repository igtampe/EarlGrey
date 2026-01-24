import { useMemo } from "react";
import useCurrentTime from "../../hooks/useCurrentTime";
import useWeather from "../../hooks/useWeather";

export default function Clock({ width, height, suppressDate }: {
    width?: string,
    height?: string
    suppressDate?: boolean
}) {

    const now = useCurrentTime();
    const { data: weather } = useWeather();

    const getSunriseSunsetTimeStirng = (isoString: string) => {

        //If we don't have it, return nada
        if (!isoString) return "--"

        //Convert it to a date
        return new Date(isoString).toLocaleTimeString(undefined, {
            hour: "numeric",
            hour12: true,
            minute: '2-digit',
        });
    }

    const { sunrise, sunset } = useMemo(() => {
        return {
            sunrise: getSunriseSunsetTimeStirng(weather?.forecast?.[0]?.sunrise),
            sunset: getSunriseSunsetTimeStirng(weather?.forecast?.[0]?.sunset)
        }
    }, [weather])


    const today = now.toLocaleDateString(undefined, {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });

    const minutes = now.getMinutes();
    const hour = now.getHours();
    const seconds = now.getSeconds();


    const totalDayMinutes = hour * 60 + minutes;
    //1440 minutes in a day
    //720 minutes in a half day

    const secondsDeg = 180 + ((seconds / 60) * 360)
    const minuteDeg = 180 + ((minutes / 60) * 360)
    const hourDeg = 180 + ((totalDayMinutes / 720) * 360)

    const hourTicks = Array.from({ length: 12 }).map((_, i) => 180 + (i / 12) * 360)

    return <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: "100%" }}>

        <div style={{
            width: width ?? "50vh", height: height ?? "50vh",
            border: "2px solid white", borderRadius: "10px", marginBottom: "10px", position: 'relative'
        }}>

            {/* 12 O-Clock */}
            {hourTicks.map(a => {
                return <div style={{
                    left: '50%', top: '0%', position: 'absolute',
                    width: "1%", height: "50%", marginLeft: "-.5%",
                    transformOrigin: "bottom center", paddingTop: "4%",
                    transform: `rotate(${a}deg)`, borderRadius: '10%'
                }} >
                    <div style={{ height: "10%", backgroundColor: "gray" }} />
                </div>
            })}

            {/* Minute hand */}

            <div style={{
                left: '50%', top: '50%', position: 'absolute',
                width: "3%", height: "40%", marginLeft: "-1.5%",
                backgroundColor: "white", transformOrigin: "top center",
                transform: `rotate(${minuteDeg}deg)`, borderRadius: '10%'
            }} />

            {/* Hour hand */}
            <div style={{
                left: '50%', top: '50%', position: 'absolute',
                width: "3%", height: "25%", marginLeft: "-1.5%",
                backgroundColor: "white", transformOrigin: "top center",
                transform: `rotate(${hourDeg}deg)`, borderRadius: '10%'
            }} />

            {/* Seconds hand */}
            <div style={{
                left: '50%', top: '50%', position: 'absolute',
                width: "1%", height: "50%", marginLeft: "-.5%",
                backgroundColor: "gray", transformOrigin: "top center",
                transform: `rotate(${secondsDeg}deg)`, borderRadius: '10%'
            }} />

            {/* Center divot */}
            <div style={{
                left: '50%', top: '50%', position: 'absolute',
                width: "3%", height: "3%", marginLeft: "-1.5%",
                marginTop: '-1.5%', backgroundColor: "white"
            }} />




        </div>

        {!suppressDate && <div>
            {today}
        </div>}

        <div style={{ display: 'flex', gap: "5px" }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: "5px" }}>
                <img src="/all/sunrise.svg" style={{ width: "48px" }} />
                <div style={{ marginRight: "10px" }}>{sunrise}</div>
            </div>
            <hr />
            <div style={{ display: 'flex', alignItems: 'center', gap: "5px" }}>
                <img src="/all/sunset.svg" style={{ width: "48px" }} />
                <div>{sunset}</div>
            </div>
        </div>

    </div>

}