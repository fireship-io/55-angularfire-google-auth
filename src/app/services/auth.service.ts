import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFirestoreDocument } from '@angular/fire/compat/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from './user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  user$: Observable<any>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  async googleSignin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    return this.updateUserData(credential.user as User);
  }

  async signOut() {
    await this.afAuth.signOut();
    return this.router.navigate(['/']);
  }

  private updateUserData(user: User) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    );

    const data = {
      uid: user.uid,
      email: user.email,
    };

    return userRef.set(data, { merge: true });
  }
}
