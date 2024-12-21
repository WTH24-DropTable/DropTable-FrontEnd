import { DateOccurances } from "./DateOccurances";

export interface Class {
    id: string,
    name: string,
    startDateTime: number, // Date and Time of the First Class
    duration: number, // in minutes
    occurance: DateOccurances,
    lessonCount: number,
}