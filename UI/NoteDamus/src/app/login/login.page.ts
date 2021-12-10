import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, ToastController } from '@ionic/angular'
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../auth/auth.service'
import { Router } from '@angular/router';
import firebase from 'firebase/app'; import 'firebase/auth';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import axios, { AxiosRequestConfig, AxiosPromise, AxiosResponse } from 'axios';
import { Storage } from '@ionic/storage-angular';

import { Observable, BehaviorSubject } from 'rxjs';
import { ToastService } from '../auth/toast.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  loginemail;
  loginpassword;
  
  firstname;
  lastname;
  email;
  password;
  passwordConfirm;

  signInValidator;
  getUserUrl = 'https://note-damus0.herokuapp.com/api/auth/register';
  getLoginUrl = 'https://note-damus0.herokuapp.com/api/auth/login';

  authError: any;


  languageSelector(language) {
    switch (language) {
      case 'tr':
        language = language
        break;
      case 'en':
        language = language
        break;
      case 'de':
        language = language
        break;
      default:
        language = 'en'
        break;
    }
    return language;
  }
  currentSlideIndex;

  @ViewChild('mySlider', { static: true }) slides: IonSlides;
  //@ViewChild(Slides) slides: Slides;

  loading;
  constructor(
    private http: HttpClient,
    private auth: AuthService,
    public loadingController: LoadingController,
    private alertController: AlertController,
    private afAuth: AngularFireAuth,
    private router: Router,
    private toast:ToastService,
    private storage: Storage

  ) {
  }


  async ngOnInit() {
    await this.storage.create();
      firebase.auth().onAuthStateChanged( user => {
        if( user){
          this.router.navigate(['/tabs/tab1']);
        }
      })
      
    // this.loading = this.loadingController.create({
    // message: 'Connecting ...'
    //});
    this.slides.mode = "md"
    setTimeout(() => {

      this.slides.lockSwipes(true);
    }, 300);
    //alert(navigator.language);
    //this.auth.eventAuthError$.subscribe(data => {
    // this.authError = data;
    //})
    /*
    this.nativeStorage.getItem('signedIn').then(res => {
      this.presentLoading();
      this.redirectUpdate()
      }).catch(error => {
        //do nothing
      });
    */
    this.slides.getActiveIndex().then(index => {
      this.currentSlideIndex = index
    })
  }

  slideToLogin() {
    this.slides.lockSwipeToNext(false).then(() => {
      this.slides.slideTo(1, 200)
      setTimeout(() => {
        this.slides.getActiveIndex().then(index => {
          this.currentSlideIndex = index
          this.slides.lockSwipeToPrev(true)
          this.slides.lockSwipeToNext(true)
          console.log(index)
        })
      }, 310);
    })


  }
  goToBeginning() {
    this.slides.lockSwipeToPrev(false).then(() => {
      this.slides.slideTo(0, 200)
      setTimeout(() => {
        this.slides.getActiveIndex().then(index => {
          this.currentSlideIndex = index
          this.slides.lockSwipeToPrev(true)
          this.slides.lockSwipeToNext(true)
          console.log(index)
        })
      }, 310);
    })




  }

  async presentPasswordReset() {
    const alert = await this.alertController.create({
      header: "change password",//'Sifre Degistir',
      inputs: [
        {

          name: 'Email',
          type: 'text',
          id: 'name2-id',
          value: '',
          placeholder: "email",


        },

      ],
      buttons: [
        {
          text: "cancel",//'Vazgec',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: "confirm",//'Onayla',
          handler: data => {
            console.log(JSON.stringify(data)); //to see the object
            console.log(data.Email);
            this.auth.sendPasswordReset(data.Email, 'en')

          }
        }
      ]
    });

    await alert.present();
  }
  swipeNext() {
    this.slides.lockSwipeToNext(false)
    this.slides.slideNext()
    this.slides.lockSwipeToNext(true)
    this.slides.getActiveIndex().then(index => {
      this.currentSlideIndex = index
    })
    this.slides.lockSwipeToPrev(true)
    this.slides.lockSwipeToNext(true)

  }
  swipePrev() {
    this.slides.lockSwipeToPrev(false)
    this.slides.slidePrev()
    this.slides.getActiveIndex().then(index => {
      this.currentSlideIndex = index
    })
    this.slides.lockSwipeToPrev(true)
    this.slides.lockSwipeToNext(true)
  }



  swipeRegister() {

    this.slides.lockSwipeToNext(false)
    this.slides.slideNext()


  }





  //----------------------------Login Logic---------------------

  //login only vvvvvv
  /* loginGoogleNativeWithoutNewData(){
     this.auth.loginGoogleNativeWithoutNewData()
   }*/
  //login only ^^^^^^
  emailRegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  registerEmailValidation = false;
  loginEmailValidation = false;
  registerEmailChanged() {
    if (this.emailRegExp.test(this.email)) {
      this.registerEmailValidation = true
    } else {
      this.registerEmailValidation = false
    }
  }
  loginEmailChanged() {
    if (this.emailRegExp.test(this.loginemail)) {
      this.loginEmailValidation = true
    } else {
      this.loginEmailValidation = false
    }
  }
  createUser(Registerfrm) {
    this.auth.createUser(Registerfrm.value);
  }
    login(Loginfrm) {
      this.auth.login(Loginfrm.value.email, Loginfrm.value.password, "en");
    }



    /*django backend */
  loginDjango(loginfrm) {
    
    let params = {
      
        "email": this.loginemail,
        "password": this.loginpassword
      
    }
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    console.log(params);

    return axios({
      method: 'POST',
      url: this.getLoginUrl,
      data: params,//JSON.stringify(data),
      //withCredentials: true,
      headers: {        
        'Content-Type': 'application/json',
      },
    }).then(async response =>{
      console.log(response);
      if(response.status == 200){
        await this.storage.set("userId", response.data.user.id)
        console.log(await this.storage.get("userId"))
        this.router.navigate(['/tabs/tab1']);
      }

    }).catch(err=>{
      this.toast.presentToast("Wrong Credentials", 1000);
    })
   /* return new Observable(observer => {
      this.http.post(this.getLoginUrl, params, options).subscribe(
        (val) => {
          observer.next(val)
          observer.complete()
        },
        response => {
          console.log("POST call in error", response);
          observer.next()
          observer.complete()
        },
        () => {

        });
    })*/

  }

  
  registerUser() {
    let params = {
      "first_name": this.firstname,
      "last_name": this.lastname,
      "email": this.email,
      "user_type": 0,
      "password": this.password
    }
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    console.log("URL " + this.getUserUrl)

    return axios({
      method: 'POST',
      url: this.getUserUrl,
      data: params,//JSON.stringify(data),
      //withCredentials: true,
      headers: {        
        'Content-Type': 'application/json',
      },
    }).then(async response =>{
      console.log(response);
      if(response.status == 200){
        await this.storage.set("userId", response.data.user.id)
        console.log(await this.storage.get("userId"))
        this.router.navigate(['/tabs/tab1']);
      }

    }).catch(err=>{
      this.toast.presentToast("Wrong Credentials", 1000);
    })

  }



}
