import { log } from "console";
import {
  ADD_LIST_ITEM,
  CHANGE_DONE_STATE,
  DELETE_LIST_ITEM,
  HIDE_COMPLATED,
  LOCAL_STORE_DATA,
} from "../constants/reducerActionTypes";
import { ListItemInterface } from "../interfaces/ListItemInterface";

export const TodoFormReducer = (
  state: ListItemInterface[],
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case ADD_LIST_ITEM:
      return [
        ...state,
        {
          id: Date.now(),
          taskName: action.payload,
          isDone: false,
          isHidden: false,
        },
      ];
    case DELETE_LIST_ITEM:
      return state.filter((item) => item.id !== action.payload);
    case CHANGE_DONE_STATE:
      return state.map((item) => {
        if (item.id === action.payload) {
          item.isDone = !item.isDone;
        }
        return item;
      });
    case HIDE_COMPLATED:
      return state.map((item) => {
        if (item.isDone) {
          if (action.payload) {
            item.isHidden = true;
          } else {
            item.isHidden = false;
          }
        }
        return item;
      });
    case LOCAL_STORE_DATA:
      return action.payload;
    default:
      break;
  }

  return state;
};
