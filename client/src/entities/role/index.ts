export { rolesReducer } from "./slice/roleSlice";

export { getAllRolesThunk, getRoleByIdThunk } from "./api";

export type {
  IRole,
  RoleArrayType,
} from "./model";
