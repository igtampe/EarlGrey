import type ForecastTemperature from "./ForecastTemperatiure";
import type WindForecastData from "./WindForecastData";

export default interface Forecast {
    /** Today, Tomorrow, (Day of week) */
    name: string;

    temperature: ForecastTemperature;
    feelsLikeTemperature: ForecastTemperature;
    wind: WindForecastData;

    /** Chance of rain (0–100) */
    chanceOfRain: number;
    uvIndex: number

    /** Sunrise time (ISO 8601 string) */
    sunrise: string;

    /** Sunset time (ISO 8601 string) */
    sunset: string;

    /** Short text description */
    description: string;

    /** Icon to use (not the NWS one) */
    icon: string;
}
