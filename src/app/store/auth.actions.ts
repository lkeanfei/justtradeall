import { Action} from "@ngrx/store";
import {Ingredient} from "../shared/Ingredient.model";
import {UserModel} from '../shared/security/user.model';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const UPDATE_USER = 'UPDATE_USER';
export const DELETE_USER = 'DELETE_USER';

export class AddIngredient implements Action {
  readonly type = ADD_INGREDIENT;


  constructor(public payload : Ingredient) {

  }
}

export class UpdateUser implements Action {
  readonly type = UPDATE_USER;
  constructor(public payload : UserModel) {

  }
}

export class DeleteUser implements Action {
  readonly type = DELETE_USER;
  constructor() {

  }
}


export type AuthActions = AddIngredient | UpdateUser | DeleteUser;
