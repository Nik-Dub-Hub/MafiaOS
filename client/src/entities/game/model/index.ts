export interface IGameAddData {
    discussionTime: number;
    key: string;
  }
  export interface IGameUpdateData {
    phase?: string;
    discussionTime?:number
    isRunning?:boolean
    currentTime?:number
    key?:string
  }
  
  export interface IGame extends IGameUpdateData {
    id: number;
    owner_id: number;
    createdAt: Date;
    updatedAt: Date;
    User: {
      id: number;
      username: string;
    };
  }
  

  
  export type GameArrayType = IGame[];
  