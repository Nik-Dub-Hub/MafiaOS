export interface IRole {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  player: {
    user_id: number;
    game_id: number;
    isAlive: boolean;
  };
}

export type RoleArrayType = IRole[];