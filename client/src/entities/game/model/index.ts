export interface IGameAddData {
  discussionTime: number;
  key: string;
}

export interface IGameUpdateData {
  phase?: string;
  discussionTime?: number;
}

export interface IGame extends IGameUpdateData {
  id: number;
  key: string;
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
