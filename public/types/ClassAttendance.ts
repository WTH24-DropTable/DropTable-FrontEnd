export interface ClassAttendance {
    classId: string,
    dateTime: string,
    attendees: StudentAttendance[],
    expectedAttendees: number
}

interface StudentAttendance {
    userId: string,
    status: "present" | "late",
}