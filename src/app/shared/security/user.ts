export interface Roles {
  normal: boolean;
  vip?: boolean;
  admin?:boolean;
}
export class User {
  email: string;
  photoURL: string;
  roles: Roles;

  constructor(authData) {
    this.email = authData.email;
    this.photoURL = authData.photoURL;
    this.roles = { normal: true , vip: false, admin: false};
  }
}
