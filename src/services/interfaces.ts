import { IUser } from '@src/core';

export interface IAuthService {
  login (params: { email?: string, username?: string, password: string }) : Promise<string>
  authenticate (token: string) : Promise<IUser>
}

export interface IUserService {
  create(params: { email: string, username: string, password: string }) : Promise<void>
  find(id: string) : Promise<IUser>
  findByLogin(params: { email?: string, username?: string }) : Promise<IUser>
  list(): Promise<IUser[]>
}
