import {Action} from "@ngrx/store";
import { Ingredient } from "../shared/Ingredient.model";
import * as AuthActions from '../store/auth.actions';
import {UserModel} from "../shared/security/user.model";

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const UPDATE_USER = 'UPDATE_USER';
export const DELETE_USER = 'DELETE_USER';

// export interface AppState {
//   ingredients:  Array<Ingredient>;
// }
export interface AppState {
   user:  UserModel;
}

// const initialState : AppState = {
//   user: [
//     new Ingredient('Apples' , 5),
//     new Ingredient('Orange' , 10)
//   ]
// };

const initialState : AppState = {
  user: {
    tokenId: null,
    isAuthenticated: false
  }
}
export function authReducer(state = initialState, action: AuthActions.AuthActions): AppState {
  switch (action.type) {
    case AuthActions.ADD_INGREDIENT:

      return {
        ...state
      }
    case AuthActions.UPDATE_USER:
      const updatedUser = {
        ...state.user ,
        ...action.payload
      };
      return {
        ...state,
        user : {...state.user , ...updatedUser}
      }
    case AuthActions.DELETE_USER:
      const nullUser  = new UserModel( null, false);
      return {
        ...state,
        user : nullUser
      }


    default:
      const auth = sessionStorage.getItem('_auth')
      console.log('auth');
      console.log(auth);
      return state;
  }




}
