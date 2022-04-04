import { ADD_USER,REMOVE_USER,ADD_TOKEN,REMOVE_TOKEN } from "../action-types/action-types.js";

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