import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public auth:AngularFireAuth) { 
    this.getUid()
  }

  login(email:string,password:string){
    return this.auth.signInWithEmailAndPassword(email,password)
  }

  async loginGoogle(){
    return this.auth.signInWithPopup( new firebase.auth.GoogleAuthProvider())
  }

  logOut(){
    return this.auth.signOut()
  }

  register(email:string,password:string){
    return this.auth.createUserWithEmailAndPassword(email,password)
  }

  async getUid(){
    const user = await this.auth.currentUser
    if(user=== null){
      return null 
    }
    else {
      return user.uid 
    }
  }

  stateAuth(){
   return  this.auth.authState
  }
}
