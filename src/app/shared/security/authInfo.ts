
export class AuthInfo {

  constructor( public $uid: string , public roles: { admin:boolean , normal: boolean , vip: boolean}) {

    if( this.roles !== null) {

    }

  }

  isLoggedIn() {

    return !!this.$uid;
  }

  isAdmin() {

    let val:boolean = false;
    if( this.roles !== null) {
      val = this.roles.admin;
    }
    return val;
  }
}
