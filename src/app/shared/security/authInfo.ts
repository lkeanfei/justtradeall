
export class AuthInfo {

  constructor( public $uid: string , public roles: { admin:boolean , normal: boolean , vip: boolean}) {
    console.log('roles object ');
    console.log( this.roles) ;

    if( this.roles !== null) {
      console.log(this.roles.admin);
      console.log(this.roles.normal);
      console.log(this.roles.vip);
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
