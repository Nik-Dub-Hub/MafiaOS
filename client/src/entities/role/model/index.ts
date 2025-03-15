export interface IRole {
  id: number;
  name: "Участник" | "Мирный" | "Мафия" | "Доктор" | "Любовница";
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export type RoleArrayType = IRole[];