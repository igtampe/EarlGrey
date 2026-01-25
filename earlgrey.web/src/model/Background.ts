export type BackgroundCategories = "any" | "day" | "night" | "sun"

export default interface Background {
    file: string
    name?: string
    description?: string
    date?: string
    crop?: string
    category?: BackgroundCategories
}