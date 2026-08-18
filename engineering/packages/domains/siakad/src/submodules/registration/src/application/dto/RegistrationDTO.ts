export interface RegistrationRequestDTO {
  studentId: string;
  academicTermId: string;
  registrationType: 'NewStudent' | 'ReRegistration' | 'Transfer' | 'Reactivation';
}

export interface RegistrationResponseDTO {
  registrationId: string;
  status: 'Draft' | 'PendingPayment' | 'PendingValidation' | 'Registered' | 'Cancelled';
  registrationDate: string;
}
