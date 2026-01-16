export default interface WindForecastData {
    /** min speed in KM/H */
    minSpeed: number

    /**max speed in KM/H */
    maxSpeed: number

    /**Direction the wind is blowing towards */
    direction: number

    /** Direction cardinal direction (N, NNW, NW, WNW, W, etc.) */
    directionString: string
}