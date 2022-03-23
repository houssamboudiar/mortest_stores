// Create Action Constants
export enum ErrorActionTypes {
       SET_ERRORS = "SET_ERRORS",
}

// Interface for SET AUTHENTICATED Action Type
export interface IErrorLoginAction {
       type: ErrorActionTypes.SET_ERRORS;
       payload:{
              error:number;
       }
}

/* 
Combine the action types with a union (we assume there are more)
example: export type CharacterActions = IGetAllAction | IGetOneAction ... 
*/
export type UserActions = IErrorLoginAction;