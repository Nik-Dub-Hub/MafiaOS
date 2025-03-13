export interface IGameAddData {
    discussionTime: number;
    key: string;
  }
  export interface IGameUpdeteData extends IGameAddData{
    phase: string;
  }
  export interface IGame extends IGameUpdeteData {
    id: number;
    owner_id: number;
    createdAt: Date;
    updatedAt: Date;
    User: {
        id : number;  
        username: string;}
  }
  

  
  export type GameArrayType = IGame[];
  