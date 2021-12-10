import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    private toastController: ToastController
  ) { }
  async presentToast(message, duration) {
    const toast = await this.toastController.create({
      message: message,
      duration: duration,
      
    });
    toast.present();
  }
  async presentToastTop(message, duration) {
    const toast = await this.toastController.create({
      message: message,
      duration: duration,
      position: "top"
      
    });
    toast.present();
  }
}
