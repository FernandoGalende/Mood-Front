import { UserSuggestions } from '../user-suggestions';

export class FiltersModel {
  public fromDate: number;
  public toDate: number;
  public users: UserSuggestions[];

  constructor(fromDate: number, toDate: number, users: UserSuggestions[]) {
    this.fromDate = fromDate;
    this.toDate = toDate;
    this.users = users;
  }
}
