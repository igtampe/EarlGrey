import { useEffect, useState } from "react";
import useApi from "../hooks/useApi";
import { getWeather } from "../api/Weather";
import demoData from "../components/DemoData.json"
import type WeatherResponse from "../model/weather/WeatherResponse";
import { WeatherContext, type WeatherContextType } from "./WeatherContext";

export function WeatherProvider({ children }: { children: React.ReactNode }) {

    const weatherApi = useApi(getWeather, true)
    const [weather, setWeather] = useState<WeatherResponse>()
    const demoWeather = demoData as WeatherResponse

    const refresh = () => weatherApi.fetch(setWeather);

    // Uncomment this to refresh the weather every minute
    // useEffect(() => {
    //     const id = setInterval(() => {
    //         refresh()
    //     }, 60000);

    //     return () => clearInterval(id);
    // }, []);

    return <WeatherContext.Provider value={{
        refresh, data: demoWeather,
        error: weatherApi.error,
        loading: weatherApi.error
    } as WeatherContextType}>
        {children}
    </WeatherContext.Provider>

}
