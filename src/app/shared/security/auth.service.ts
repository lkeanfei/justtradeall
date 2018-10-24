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
import { from } from 'rxjs';

@Injectable()
export class AuthService {

  private user: Observable<firebase.User>;
  private userDetails: firebase.User = null;
  // userSubject: BehaviorSubject<User> = new BehaviorSubject(null);
  // authSubject: BehaviorSubject<User> = new BehaviorSubject(null);
  isAdmin = false;
  loginChanged = new Subject<Boolean>();

  static UNKNOWN_USER = new User(null , null, null);
  authSubject: BehaviorSubject<User> = new BehaviorSubject<User>( AuthService.UNKNOWN_USER);

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



    this.user = this.firebaseAuth.authState;
    // this.firebaseAuth.authState.pipe(switchMap( auth => {
    //
    //   if (auth) {
    //     // successfully signed in
    //     console.log('Successufl signed at auth service')
    //     return this.db.object('users/' + auth.uid).valueChanges();
    //   } else {
    //     return of(null);
    //   }
    // })).subscribe(user => {
    //   if (user !== null) {
    //
    //     const authInfo = new AuthInfo(user.$key , user.roles);
    //     this.authSubject.next(authInfo);
    //     this.userSubject.next(user);
    //   }
    // });
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


  triggerAuthEvent( user: User ) {
     this.authSubject.next(user);
  }

  getAuthStatus(): Observable<User> {
    return this.authSubject.asObservable();
  }

  verifyUser() : Observable<User> {

     this.httpService.verifySession().subscribe( val => {
     //

       let user = AuthService.UNKNOWN_USER;
        if ( val['status'] == 'ok') {
           user = new User(val['name'], val['email'], val['photourl'])
           // user.name = val['name'];
           // user.email = val['email'];
           // user.photourl = val['photourl'];
           // console.log('Verify ' + user.name + ' ' + user.email + ' '  + user.photourl)
        }

        this.authSubject.next(user);

     });

     return this.authSubject.asObservable();
  }

  resetPassword(email): Observable<any> {

    const subject = new Subject<any>();
    this.firebaseAuth.auth.sendPasswordResetEmail(email)
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

  login(email, password): Observable<any> {

    // return Observable.fromPromise(this.auth.auth.signInWithEmailAndPassword( email , password))
    return this.fromFirebaseAuthPromise(this.firebaseAuth.auth.signInWithEmailAndPassword(email, password));

  }

  // Gets the ID Token of the authenticated user
  getIdToken() : Observable<string> {
    const idTokenObservable  = from(this.firebaseAuth.auth.currentUser.getIdToken(true));
    return idTokenObservable;
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

    // have to notify the header after successful
    //
    this.httpService.logout().subscribe( res => {
      console.log('logout')
    })
    this.firebaseAuth.auth.signOut()
      .then( res => {
      //     Successfully sign out
          console.log('Sign out OK!')
        // this.loginChanged.next(false);
        this.authSubject.next(AuthService.UNKNOWN_USER);
      } , err => {
          // Failed to sign out
          console.log('Sign out Failed!')
          console.log(err);
      })



  }

  // check
  checkUsername() {
     let list ;
     this.db.list('/users').valueChanges()
       .subscribe(
         (usersList) => {

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


          // const authInfo = new AuthInfo(this.firebaseAuth.auth.currentUser.uid , null);
          // this.authSubject.next(authInfo);
          this.loginChanged.next(true);


          subject.next(res);
          subject.complete();
        },
        err => {
          this.loginChanged.next(false);

          console.log('Error is ' + err);
          this.authSubject.error(err);
          subject.error(err);
          subject.complete();
        }
      );

    return subject.asObservable();
  }





}
