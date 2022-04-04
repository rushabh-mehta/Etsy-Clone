import { ADD_USER } from "./action-types/action-types";
import { REMOVE_USER } from "./action-types/action-types";
import { ADD_TOKEN } from "./action-types/action-types";
import { REMOVE_TOKEN } from "./action-types/action-types";


const initialState = {
  user: {},
  token:""
};
function rootReducer(state = initialState, action) {
    if (action.type === ADD_USER) {
      console.log("adding user");
      return Object.assign({}, state, {
        user: action.payload
      });
    }
    if(action.type===ADD_TOKEN){
      console.log("adding token");
      return Object.assign({}, state, {
        token: action.payload
      }); 
    }
    if(action.type===REMOVE_USER){
      console.log("removing user");
      return Object.assign({}, state, {
        user: null
      }); 
    }
    if(action.type===REMOVE_TOKEN){
      console.log("removing token");
      return Object.assign({}, state, {
        token: null
      }); 
    }
    return state;
  }
  
export default rootReducer;