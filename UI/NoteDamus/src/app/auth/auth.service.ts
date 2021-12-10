import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app'; import 'firebase/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ToastService } from './toast.service';
import { LoadingController, Platform } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  

/*  private eventAuthError = new BehaviorSubject<string>("");
  eventAuthError$ = this.eventAuthError.asObservable();*/

  newUser: any;
  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router,
    public toast: ToastService,
    //private fb: Facebook,
    //private gp: GooglePlus,
    public loadingController: LoadingController,
    public alertController: AlertController,
    private platform: Platform,
    
  ) {
   
    firebase.auth().useDeviceLanguage()
  }
  getUserMode(){
    var userid = firebase.auth().currentUser.uid
    if(userid){
      return this.db.collection('usernames',ref => ref
      .where('uid', '==', userid)).get()
    }
  }
  async presentLoading(loading) {
		return await loading.present();
	}
  getUserState() {
    return this.afAuth.authState;
  }

  async sendPasswordReset(emailAdress, language){
    firebase.auth().useDeviceLanguage()
    const loading = await this.loadingController.create({
			 
    });
    loading.present();
    await this.afAuth.useDeviceLanguage()
    this.afAuth.sendPasswordResetEmail(emailAdress).then( ()=> {
      loading.dismiss()
      this.toast.presentToast("check your email for password renewal link", 1000)
    }).catch(error => {
      var message = this.Parse(error.code)
      loading.dismiss()
      console.log(message)
      console.log(error.code)
      this.presentPasswordResetErrorAlert(message)
    });
  }
  async presentPasswordResetErrorAlert(messagem) {
    const alert = await this.alertController.create({
      header: 'Error',
      //subHeader: 'Subtitle',
      message: messagem,
      buttons: ['OK']
    });

    await alert.present();
  }

  async login(email: string, password: string, language) {
    const loading = await this.loadingController.create({
			 
    });
    loading.present();
    this.afAuth.useDeviceLanguage()
    this.afAuth.signInWithEmailAndPassword(email, password)
      .catch(error => {
        loading.dismiss()
        var message = this.Parse(error.code)
        console.log(message)
        this.presentPasswordResetErrorAlert(message)

      })
      .then(userCredential => {
        if (userCredential) {
          //userCredential.user.sendEmailVerification()
          loading.dismiss()
          this.toast.presentToast("Signed in successfully", 250)
          this.router.navigate(['']);
        }
      })
  }

  async createUser(
    user) {
        const loading = await this.loadingController.create({
           
        });
        loading.present();
        firebase.auth().useDeviceLanguage()
        this.afAuth.useDeviceLanguage()
    console.log(user);
    this.afAuth.createUserWithEmailAndPassword(user.email, user.password)
      .then(userCredential => {
        this.newUser = user;
        userCredential.user.sendEmailVerification()
        console.log(userCredential);
        userCredential.user.updateProfile({
          //displayName: user.firstName + ' ' + user.lastName

        });
        this.insertUserData(
          userCredential)
          .then(() => {
            loading.dismiss()
            this.toast.presentToast("Signed up successfully", 250)
            this.router.navigate(['']);
          });
      })
      .catch(error => {
        loading.dismiss()
         var message = this.Parse(error.code)
        console.log(error.code)
        this.presentPasswordResetErrorAlert(message)

      });

  }

  insertUserData(
    
    userCredential: firebase.auth.UserCredential) {
    var platform;
    var browserlanguage = window.navigator.language
    if(this.platform.is('cordova')){
      if(this.platform.is('ios')){
        platform = 'ios'
      }else if(this.platform.is('android')){
        platform = 'android'
      }
    }else {platform = 'pwa'}
    //record user weight on device


    return this.db.doc(`Users/${userCredential.user.uid}`).set({
      email: this.newUser.email,
      role: platform,
      uid: userCredential.user.uid,      
      language: browserlanguage,      



    } , {merge: true})
  }


  logout() {
    return this.afAuth.signOut().then(() => {
      this.toast.presentToast("Signed out", 1000)
      this.router.navigate(['/login']);
    });

  }

  

async updateUserData(
  user) {
  const loading = await this.loadingController.create({
  });
  this.presentLoading(loading);
   this.db.doc(`Users/${user.uid}`).set({
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
   
  })

   
  
    loading.dismiss()
    this.toast.presentToast("Signed up successfully", 1000)
  .then(() => {
    this.router.navigate(['']);
  })
}

Parse(errorCode: string): string {  
  return this.ParseFunc(errorCode, 'en'); 
}
  ParseFunc(errorCode: string, language): string {
  
    let message: string;
    if(language == 'tr'){
      switch (errorCode) {
        case 'auth/wrong-password':
          message = 'Invalid login credentials.';
          break;
        case 'auth/network-request-failed':
          message = 'Please check your internet connection';
          break;
        case 'auth/too-many-requests':
          message =
            'We have detected too many requests from your device. Take a break please!';
          break;
        case 'auth/user-disabled':
          message =
            'Your account has been disabled or deleted. Please contact the system administrator.';
          break;
        case 'auth/requires-recent-login':
          message = 'Please login again and try again!';
          break;
        case 'auth/email-already-exists':
          message = 'Email address is already in use by an existing user.';
          break;
        case 'auth/user-not-found':
          message =
            'Bu email adresiyle veya telefon numarasiyla iliskilendirilmis bir kullanici hesabi yoktur';
          break;
        case 'auth/phone-number-already-exists':
          message = 'The phone number is already in use by an existing user.';
          break;
        case 'auth/invalid-phone-number':
          message = 'The phone number is not a valid phone number!';
          break;
        case 'auth/invalid-email':
          message = 'The email address is not a valid email address!';
          break;
        case 'auth/cannot-delete-own-user-account':
          message = 'You cannot delete your own user account.';
          break;
         default:
          message = 'Oops! Birseyle Yanlis gitti, bilgilerinizi kontrol edip tekrar deneyiniz.';
          break;
      }
    }else{
    switch (errorCode) {
      case 'auth/wrong-password':
        message = 'Invalid login credentials.';
        break;
      case 'auth/network-request-failed':
        message = 'Please check your internet connection';
        break;
      case 'auth/too-many-requests':
        message =
          'We have detected too many requests from your device. Take a break please!';
        break;
      case 'auth/user-disabled':
        message =
          'Your account has been disabled or deleted. Please contact the system administrator.';
        break;
      case 'auth/requires-recent-login':
        message = 'Please login again and try again!';
        break;
      case 'auth/email-already-exists':
        message = 'Email address is already in use by an existing user.';
        break;
      case 'auth/user-not-found':
        message =
          'We could not find user account associated with the email address or phone number.';
        break;
      case 'auth/phone-number-already-exists':
        message = 'The phone number is already in use by an existing user.';
        break;
      case 'auth/invalid-phone-number':
        message = 'The phone number is not a valid phone number!';
        break;
      case 'auth/invalid-email':
        message = 'The email address is not a valid email address!';
        break;
      case 'auth/cannot-delete-own-user-account':
        message = 'You cannot delete your own user account.';
        break;
       default:
        message = 'Oops! Something went wrong. Try again later.';
        break;
    }
  }
    return message;
  }
}
