export interface MedicalCertificate {
    id: string,
    userId: string,
    patientName: string,
    startDate: number,
    duration: number,
    clinicName: string,
    imageUrl: string,
    status: 'pending' | 'approved' | 'denied',
}