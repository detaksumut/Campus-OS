export interface SubmitRegistrationCommand {
  readonly userId: string;
  readonly registrationPeriodId: string;
  readonly personalData: {
    readonly fullName: string;
    readonly dateOfBirth: string; // ISO format
    readonly gender: 'MALE' | 'FEMALE';
    readonly nationality: string;
    readonly nationalIdNumber: string;
  };
}
