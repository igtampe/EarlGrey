import type WindData from "./WindData";

export default interface CurrentConditions {
    /** Temperature in Celsius */
    temperature: number;

    /** Feels-like temperature (wind chill or heat index) in Celsius */
    feelsLike?: number;

    /** Wind data */
    wind: WindData;

    /** Barometric pressure in hPa */
    pressure: number;

    /** Humidity as a percent (0–100) */
    humidity: number;

    /** Timestamp of this observation */
    timestamp: string;

    /** Short text description */
    description: string;

    /** Icon to use (not the NWS one) */
    icon: string;
}
