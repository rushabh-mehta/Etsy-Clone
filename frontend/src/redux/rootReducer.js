import { ADD_USER } from "./action-types/action-types";
import { REMOVE_USER } from "./action-types/action-types";
import { ADD_TOKEN } from "./action-types/action-types";
import { REMOVE_TOKEN } from "./action-types/action-types";
import { GET_COUNTRIES } from "./action-types/action-types";
import { GET_CURRENCIES } from "./action-types/action-types";


const initialState = {
  user: {},
  token:"",
  countries:[]
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
    if(action.type===GET_COUNTRIES){
      console.log("getting countries");
      return Object.assign({}, state, {
        countries: action.payload
      }); 
    }
    if(action.type===GET_CURRENCIES){
      console.log("getting currencies");
      return Object.assign({}, state, {
        currencies: action.payload
      }); 
    }
    return state;
  }
  
export default rootReducer;