import type WeatherResponse from "../model/weather/WeatherResponse";
import { API_PREFIX, Get } from "./Common";

const ENDPOINT = API_PREFIX + "weather/"

export const getWeather = (
    setLoading: (value: boolean) => void,
    setItem: (value?: WeatherResponse) => void,
    onError: (value: any) => void,
) => Get(setLoading, setItem, onError, ENDPOINT)