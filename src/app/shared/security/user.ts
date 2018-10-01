export interface Roles {
  normal: boolean;
  vip?: boolean;
  admin?:boolean;
}
export class User {
  email: string;
  photourl: string;
  name: string;

  // constructor(authData) {
  //   this.email = authData.email;
  //   this.photoURL = authData.photoURL;
  //   this.roles = { normal: true , vip: false, admin: false};
  // }

  constructor( name: string, email: string , photoURL: string) {
    this.name = name
    this.photourl = photoURL
    this.email = email
  }
}
