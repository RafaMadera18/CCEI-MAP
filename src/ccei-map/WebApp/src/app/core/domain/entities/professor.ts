export class Professor {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
    public readonly phone?: string
  ) {}

  getContactInfo(): string {
    return `${this.name} - ${this.email}${this.phone ? ` - ${this.phone}` : ''}`;
  }

  hasPhoneNumber(): boolean {
    return !!this.phone;
  }
}
