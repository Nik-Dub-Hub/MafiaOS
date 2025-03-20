
export interface IPlayer {
  id: number;
  user_id: number;
  game_id: number;
  role_id: number;
  isAlive: boolean;
  createdAt: Date;
  updatedAt: Date;
  User:{
    id:number
    username:string
    img:string
  },
  Game:{
    id:number;
    owner_id:number;
    phase:string
    key:string;
    isReady:boolean;
    discussionTime:number;
  },
  Role:{
    id:number;
    name:string;
  }
}

export interface IPlayerForUpdate {
  role_id?: number
  isAlive?:boolean;
}

export type PlayerArrayType = IPlayer[]
