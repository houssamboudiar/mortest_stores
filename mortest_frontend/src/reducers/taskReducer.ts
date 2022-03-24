// Import Reducer type
import { AnyAction, Reducer } from 'redux';
import { TaskActionTypes } from '../actions/taskAction';

// Define the Character type
export interface Itask {
       actualTask: string,
       previousTask: string,
}

// Define the Character State
export interface ITaskState {
  readonly task: Itask[];
}

// Define the initial state
const initialTaskState: ITaskState = {
       task: [{
              actualTask: "dashboard",
              previousTask: "dashboard",
       }
       ],
};

export const productReducer: Reducer<ITaskState, AnyAction> = (
  state = initialTaskState, action: any 
) => {
  switch (action.type) {
    case TaskActionTypes.SET_DASHBOARD: {
      return {
        ...state,
        task: action.task,
      };
    }
    default:
      return state;
  }
};