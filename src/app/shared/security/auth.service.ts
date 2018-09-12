import { Injectable } from '@angular/core';
import { AngularFireAuth  } from 'angularfire2/auth';
import {Observable} from 'rxjs/index';
import {Subject} from 'rxjs/index';
import {AuthInfo} from './authInfo';
import {BehaviorSubject} from 'rxjs/index';
import * as firebase from 'firebase/app';
import {User} from './user';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {HttpService} from '../httpservice.service';
import {HttpParams} from '@angular/common/http';
import {ObjectUnsubscribedError} from 'rxjs/index';
import { switchMap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { of } from 'rxjs';
@Injectable()
export class AuthService {

  private user: Observable<firebase.User>;
  private userDetails: firebase.User = null;
  userSubject: BehaviorSubject<User> = new BehaviorSubject(null);
  isAdmin = false;
  loginChanged = new Subject<Boolean>();
  static UNKNOWN_USER = new AuthInfo(null , null);
  authSubject: BehaviorSubject<AuthInfo> = new BehaviorSubject<AuthInfo>( AuthService.UNKNOWN_USER);

  constructor(private db: AngularFireDatabase ,
              private firestore: AngularFirestore,
              private firebaseAuth: AngularFireAuth ,
              private httpService: HttpService) {

      let id = localStorage.getItem('id')
      if (id == null ) {
      //    Trigger change
          this.loginChanged.next(false);
      } else {
          this.loginChanged.next(true);
      }
      console.log('constructing AuthService ' + localStorage.getItem('id'));

    this.user = this.firebaseAuth.authState;
    this.firebaseAuth.authState.pipe(switchMap( auth => {

      if (auth) {
        // successfully signed in
        return this.db.object('users/' + auth.uid).valueChanges();
      } else {
        return of(null);
      }
    })).subscribe(user => {
      if (user !== null) {
        console.log(user);
        const authInfo = new AuthInfo(user.$key , user.roles);
        this.authSubject.next(authInfo);
        this.userSubject.next(user);
      }
    });
    // this.firebaseAuth.authState.switchMap( auth => {
    //
    //   if(auth)
    //   {
    //     //successfully signed in
    //     return this.db.object('users/' + auth.uid).valueChanges();
    //   }
    //   else
    //   {
    //     return Observable.of(null);
    //   }
    // })

  }

  // private updateUser(authData) {
  //   const userData = new User(authData);
  //
  //   // grab any existing users including roles
  //   const angularFireObject = this.firestore.collection('users/').add(authData.uid);
  //   // angularFireObject.update(userData);
  //
  // }

  //Toggle login change
    toggleLoginChange( val: Boolean) {
        this.loginChanged.next(val);
    }

  resetPassword(email): Observable<any> {


    const subject = new Subject<any>();

    this.firebaseAuth.auth.sendPasswordResetEmail(email)
      .then(
        res => {

          console.log("On ok");
          console.log(res);

          subject.next(res);
          subject.complete();
        },
        err => {
           console.log("On rejected");
           console.log(err);
          subject.error(err);
          subject.complete();
        }

      )



    return subject.asObservable();


  }

  login(email, password): Observable<any> {

    // return Observable.fromPromise(this.auth.auth.signInWithEmailAndPassword( email , password))
    return this.fromFirebaseAuthPromise(this.firebaseAuth.auth.signInWithEmailAndPassword(email, password));

  }

  signUp(email, password) : Observable<any>
  {
    const subject = new Subject<any>();

    this.firebaseAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(
        res => {

          subject.next(res);
          subject.complete();
        },
        err => {

          subject.error(err);
          subject.complete();
        }

      )

    return subject.asObservable();
  }

  // logout
  logout() {
    this.firebaseAuth.auth.signOut();
    this.loginChanged.next(false);
    this.authSubject.next(AuthService.UNKNOWN_USER);
    localStorage.removeItem('id');

  }

  // check
  checkUsername() {
     let list ;
     this.db.list('/users').valueChanges()
       .subscribe(
         (usersList) => {
           console.log("Users ");
           console.log(usersList);
         }
       );

  }


  // login with Google
  loginGoogle(): Observable<any> {

    return this.fromFirebaseAuthPromise(this.firebaseAuth.auth.signInWithPopup( new firebase.auth.GoogleAuthProvider()));
  }

  loginFacebook(): Observable<any>  {
    return this.fromFirebaseAuthPromise(this.firebaseAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()));
  }

  loginTwitter(): Observable<any> {
    return this.fromFirebaseAuthPromise(this.firebaseAuth.auth.signInWithPopup(new firebase.auth.TwitterAuthProvider()));
  }

  fromFirebaseAuthPromise(promise):Observable<any> {
    const subject = new Subject<any>();
    promise
      .then( res => {

         // console.log('*******Successful login!');
         // console.log(res);
         //  console.log('*******Current User!');
          console.log(this.firebaseAuth.auth.currentUser);
          const authInfo = new AuthInfo(this.firebaseAuth.auth.currentUser.uid , null);
          this.authSubject.next(authInfo);
          // console.log('id token')
          // this.firebaseAuth.auth.currentUser.getIdToken(true).then( (idToken) => {
          //         localStorage.setItem('id' , idToken);
          //            console.log('****' + idToken);
          //         const body = new HttpParams()
          //             .set('token' , idToken);
          //
          //
          //         this.httpService.post('/api/hello-view/' , body.toString()).subscribe(
          //             data => { console.log('post data ' + data); },
          //             err => { console.log('err ' + err);},
          //             ()  => { console.log('finished!');}
          //         );
          //     });

          this.loginChanged.next(true);


          subject.next(res);
          subject.complete();
        },
        err => {
          this.loginChanged.next(false);
          localStorage.removeItem('id');
          console.log('Error is ' + err);
          this.authSubject.error(err);
          subject.error(err);
          subject.complete();
        }
      );

    return subject.asObservable();
  }





}
