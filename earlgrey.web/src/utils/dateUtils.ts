const HOURS = 60 * 60 * 1000;

export function addHours(date: Date, hours: number): Date {
    return new Date(date.getTime() + hours * HOURS);
}