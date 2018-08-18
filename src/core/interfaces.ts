interface Identifiable {
  id?: string;
}

interface IAuditable extends Identifiable {
  createdAt?: string;
  updatedAt?: string;
}

export interface IUser extends IAuditable {
  username: string;
  email: string;
  secret: any;
  salt: any;
}

export interface IAuthToken extends IAuditable {
  userId: string;
  token: string;
}
