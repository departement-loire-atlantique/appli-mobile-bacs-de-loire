import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private alertController: AlertController, private route: Router) { }

  async openModalError(title: string, body: string) {
    const askAlert = await this.alertController.create({
      header: title,
      message: body,
      buttons: [{
        text: 'Retour',
        role: 'cancel',
        handler: () => {
          console.log('CANCEL');
        }
      }]
    });
    return await askAlert.present();
  }
}
