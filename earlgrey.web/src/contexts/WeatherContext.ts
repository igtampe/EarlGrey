import { createContext } from "react";
import type WeatherResponse from "../model/weather/WeatherResponse";

export interface WeatherContextType {
    refresh: () => void,
    data: WeatherResponse
    loading: boolean
    error: any
}

export const WeatherContext = createContext<WeatherContextType | null>(null);
