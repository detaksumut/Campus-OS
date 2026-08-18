export class EmailAddress {
  constructor(private readonly email: string) {
    if (!email || email.trim() === '') {
      throw new Error('Email address cannot be empty.');
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error(`Invalid email address format: ${email}`);
    }
    this.email = email.toLowerCase().trim();
  }

  getValue(): string {
    return this.email;
  }

  equals(other: EmailAddress): boolean {
    return this.email === other.getValue();
  }
}
