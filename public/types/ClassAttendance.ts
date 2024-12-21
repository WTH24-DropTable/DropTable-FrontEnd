export interface ClassAttendance {
    classId: string,
    dateTime: string,
    attendedStudents: StudentAttendance[],
}

interface StudentAttendance {
    studentId: string,
    status: "present" | "late",
}