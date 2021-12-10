import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../auth/auth.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{

  constructor(
    private authService: AuthService,
    private alertController: AlertController,
    private router: Router,
    private storage:Storage
  ) {}

  async ngOnInit(){
    await this.storage.create();
  }
  async logout() {
    const alert = await this.alertController.create({
      header: "confirm",
      message: "are you sure to log out?",
      buttons: [
        {
          text: "cancel",
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: "confirm",
          handler: () => {
            //this.authService.logout()
            this.storage.set("userId",null);
            this.router.navigate(['/login']);


          }
        }
      ]
    });
    await alert.present();

  }

}
