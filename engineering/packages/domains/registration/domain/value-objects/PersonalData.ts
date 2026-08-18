export class PersonalData {
  constructor(
    public readonly fullName: string,
    public readonly dateOfBirth: Date,
    public readonly gender: 'MALE' | 'FEMALE',
    public readonly nationality: string,
    public readonly nationalIdNumber: string
  ) {
    if (!fullName || fullName.trim() === '') {
      throw new Error('FullName cannot be empty');
    }
  }
}
