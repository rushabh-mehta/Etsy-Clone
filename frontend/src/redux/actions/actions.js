import {axiosInstance as authapi} from '../../services/authpost';
import { ADD_USER,REMOVE_USER } from "../action-types/action-types.js";
import {ADD_TOKEN,REMOVE_TOKEN } from "../action-types/action-types.js";
import { GET_COUNTRIES } from "../action-types/action-types";
import { GET_CURRENCIES } from "../action-types/action-types";


const GET_COUNTRY_API = '/api/country/';
const GET_CURRENCIES_API = "/api/currency/";

export function addUser(payload) {
  return { type: ADD_USER, payload };
}

export function addToken(payload) {
  return { type: ADD_TOKEN, payload };
}

export function removeUser() {
  return { type: REMOVE_USER};
}

export function removeToken() {
  return { type: REMOVE_TOKEN};
}

export function getCountries() {
  return function(dispatch){
    let payload = {};
    authapi.get(GET_COUNTRY_API)
    .then((response)=>{
      if(response && response.data && response.data.success && response.data.countries){
        payload = response.data.countries;
      }
      dispatch({ type: GET_COUNTRIES, payload});
    })
    .catch((e)=>{
        console.log(e);
        dispatch({ type: GET_COUNTRIES, payload});
    });
  }
}

export function getCurrencies() {
  return function(dispatch){
    let payload = {};
    authapi.get(GET_CURRENCIES_API)
    .then((response)=>{
      if(response && response.data && response.data.success && response.data.currencies){
        payload = response.data.currencies;
      }
      dispatch({ type: GET_CURRENCIES, payload});
    })
    .catch((e)=>{
        console.log(e);
        dispatch({ type: GET_CURRENCIES, payload});
    });
  }
}
