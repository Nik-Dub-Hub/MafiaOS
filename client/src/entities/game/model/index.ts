export interface IGameAddData {
    discussionTime: number;
    key: string;
  }
  export interface IGameUpdateData {
    phase?: string;
    discussionTime?:number
  }
  export interface IGame extends IGameUpdateData {
    id: number;
    key:string
    owner_id: number;
    createdAt: Date;
    updatedAt: Date;
    User: {
      id: number;
      username: string;
    };
  }
  

  
  export type GameArrayType = IGame[];
  