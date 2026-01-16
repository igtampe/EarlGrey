import { useContext } from "react";
import { WeatherContext, type WeatherContextType } from "../contexts/WeatherContext";

export default function useWeather(): WeatherContextType {
    const ctx = useContext(WeatherContext);
    if (!ctx) {
        throw new Error("useCurrentTime must be used within a TimeProvider");
    }
    return ctx;
}
