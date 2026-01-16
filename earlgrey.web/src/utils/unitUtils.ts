
const convertToInHg = (pascals?: number) => (pascals ?? 0) * (100 / 3386.3886666667)
const convertToF = (celsius?: number) => ((celsius ?? 0) * (9 / 5)) + 32
const convertToMph = (kmh?: number) => (kmh ?? 0) * 0.6213711922;

export type Units = "imperial" | "metric";

export const displayTemperature = (metric: number | undefined, desiredUnit: Units | undefined) => desiredUnit === "imperial"
    ? `${Math.round(convertToF(metric))}°`
    : `${metric}°`

export const displaySpeed = (metric: number | undefined, desiredUnit: Units | undefined) => desiredUnit === "imperial"
    ? `${Math.round(convertToMph(metric))} MPH`
    : `${metric} KMH`

export const displayPressure = (metric: number | undefined, desiredUnit: Units | undefined) => desiredUnit === "imperial"
    ? `${convertToInHg(metric).toFixed(2)} inHg`
    : `${(metric ?? 0)} kPa` 