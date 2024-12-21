export interface Attendance {
    userId: string,
    classId: string,
    status: 'present' | 'absent' | 'late',
    takenAt: number,
}