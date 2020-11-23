import { Injectable } from '@angular/core';
import '@capacitor-community/http';
import { HttpDownloadFileResult } from '@capacitor-community/http';
import { FilesystemDirectory, Plugins } from '@capacitor/core';
import { Platform } from '@ionic/angular';
import { environment } from 'src/environments/environment';

import { ApiEvent } from '../models/event';
import { Bus } from '../models/horaire';
import { InterstitialData } from '../models/interstitial';

const { Http, Filesystem } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private requestParams = {};

  constructor(private platform: Platform) {
    if (!platform.is('capacitor')) {
      this.requestParams = {
        mode: 'no-cors'
      };
    }
  }

  async getInterstitial(): Promise<InterstitialData> {
    const response = await Http.request({
      method: 'GET',
      url: environment.secondaryApiUrl + '/traficparameter?id=mobile_intersticiel&format=json',
      params: {
        mode: 'no-cors'
      }
    });

    return response.data.mobile_intersticiel;
  }

  async getEvent(from: string, to: string): Promise<ApiEvent[]> {
    let args = `Bac de Loire ${from} - ${to}`;

    if (this.platform.is('ios')) {
      args = encodeURI(args);
    }

    const urlEvent = environment.apiUrl + `/traficevents?filter=${args}`;

    const response = await Http.request({
      method: 'GET',
      url: urlEvent,
      params: this.requestParams
    });

    return response.data;
  }

  async getHoraireBus(codeBus: string): Promise<Bus[]> {
    const response = await Http.request({
      method: 'GET',
      url: environment.apiUrlBus + codeBus,
      params: this.requestParams
    });
    return response.data;
  }

  async getHoraireBacs(typeLiaison: string): Promise<any> {
    const response = await Http.request({
      method: 'GET',
      url: environment.secondaryApiUrl + '/traficparameter?id=bacs_horaires',
      params: this.requestParams
    });

    return response.data.bacs_horaires[typeLiaison];
  }

  async getLatestWebcam(typeWebcam: string): Promise<string> {

    if (this.platform.is('ios')) {
      await Filesystem.deleteFile({
        path: `webcam-${typeWebcam}.jpg`,
        directory: FilesystemDirectory.Cache
      });
    }

    const download: HttpDownloadFileResult = await Http.downloadFile({
      url: environment.apiUrl + `/webcam?id=${typeWebcam}`,
      filePath: `webcam-${typeWebcam}.jpg`,
      fileDirectory: FilesystemDirectory.Cache
    });

    // On a device the file will be written and will return a path
    if (download.path) {
      // This will return a base64 !
      const read = await Filesystem.readFile({
        path: `webcam-${typeWebcam}.jpg`,
        directory: FilesystemDirectory.Cache
      });

      return 'data:image/jpg;base64,' + read.data;
    }

    // On desktop the function will return a blob
    if (download.blob) {
      let result = null;

      await new Promise((resolve, reject) => {
        if (download.blob) {
          const reader = new FileReader();
          reader.onload = () => {
            result = reader.result;
            resolve();
          };
          reader.readAsDataURL(download.blob);
        } else {
          reject();
        }
      });
      return result;
    }

    return;
  }
}
