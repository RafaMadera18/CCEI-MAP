import { Account } from "@domain/dtos";

export class UserEntity {
  constructor(
    public readonly id: string,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly email: string,
    public readonly phone: string,
    private readonly account: Account
  ) {}

  getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  isSessionValid(): boolean {
    return this.account.isSessionValid;
  }

  getAccount(): Account {
    return { ...this.account };
  }
}
