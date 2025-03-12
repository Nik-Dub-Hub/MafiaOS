export { userReducer } from "./slice/userSlice";
export {UserAvatar} from './ui/UserAvatar/UserAvatar'
export {
  refreshTokensThunk,
  signInThunk,
  signUpThunk,
  signOutThunk,
  updateUserThunk,
} from "./api";

export type {
  IUser,
  IUserSignInData,
  IUserSignUpData,
  IAuthResponseData,
  IUserUpdateData,
} from "./model";