export interface IRole {
  id: number;
  name: "Participant" | "Civilian" | "Mafia" | "Doctor" | "Lady";
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export type RoleArrayType = IRole[];