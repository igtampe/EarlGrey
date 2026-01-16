import type CurrentConditions from "./CurrentConditions"
import type Forecast from "./Forecast"

export default interface WeatherResponse {
    currentConditions: CurrentConditions
    forecast: Forecast[]
    lastUpdate: string
    fetchedOn: string
}