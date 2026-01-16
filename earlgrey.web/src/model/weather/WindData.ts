export default interface WindData {
    /** Speed in KM/H */
    speed: number

    /**Gust speed in KM/H */
    gustSpeed: number

    /**Direction the wind is blowing towards */
    direction: number

    /** Direction cardinal direction (N, NNW, NW, WNW, W, etc.) */
    directionString: string
}