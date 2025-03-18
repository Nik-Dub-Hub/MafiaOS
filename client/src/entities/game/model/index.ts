export interface IGameAddData {
  discussionTime: number;
  key: string;
}
export interface IGameUpdateData {
  phase?: string;
  discussionTime?: number;
  isRunning?: boolean;
  currentTime?: number;
  key?: string;
}

export interface IGame extends IGameUpdateData {
  id: number;
  owner_id: number;
  voting: number[];
  createdAt: Date;
  updatedAt: Date;
  User: {
    id: number;
    username: string;
  };
}
export interface IVoteData {
  vote: number;
}

export interface IVoteResponse {
  voting: number[];
  updatedAt: Date;
}

export type GameArrayType = IGame[];
