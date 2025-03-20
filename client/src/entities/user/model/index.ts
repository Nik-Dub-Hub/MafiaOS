export interface IUserSignInData {
  email: string;
  password: string;
}

export interface IUserSignUpData extends IUserSignInData {
  username: string;
}

export interface IUserUpdateData {
  username?: string;
  email?: string;
  img?: string;
  civilianCount?: number;
  ladyCount?: number;
  mafiaCount?: number;
  doctorCount?: number;
}

export interface IUser {
  id: number;
  email: string;
  username: string;
  img: string;
  civilianCount: number;
  ladyCount: number;
  mafiaCount: number;
  doctorCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAuthResponseData {
  user: IUser;
  accessToken: string;
}

export interface IUserForProps {
  id:number
  username:string
  img:string
}