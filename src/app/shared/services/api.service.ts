import { Injectable } from '@angular/core';
import '@capacitor-community/http';
import { HttpDownloadFileResult } from '@capacitor-community/http';
import { FilesystemDirectory, Plugins } from '@capacitor/core';
import { environment } from 'src/environments/environment';

import { ApiEvent } from '../models/event';
import { Bus } from '../models/horaire';


const { Http, Filesystem } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  async getEvent(from: string, to: string): Promise<ApiEvent[]> {
    const urlEvent = environment.apiUrl + '/traficevents?filter=Bac%20de%20Loire%20' + encodeURI(`${from} - ${to}`);
    const response = await Http.request({
      method: 'GET',
      url: urlEvent,
      params: {
        mode: 'no-cors'
      }
    });
    return response.data;
  }

  async getHoraireBus(codeBus: string): Promise<Bus[]> {
    const response = await Http.request({
      method: 'GET',
      url: environment.apiUrlBus + codeBus,
      params: {
        mode: 'no-cors'
      }
    });
    return response.data;
  }

  async getHoraireBacs(typeLiaison: string): Promise<any> {
    const response = await Http.request({
      method: 'GET',
      url: environment.apiUrlHoraire,
      params: {
        mode: 'no-cors'
      }
    });

    return response.data.bacs_horaires[typeLiaison];
  }

  async getLatestWebcam(typeWebcam: string): Promise<string> {
    const download: HttpDownloadFileResult = await Http.downloadFile({
      url: environment.apiUrl + `/webcam?id=${typeWebcam}`,
      filePath: `webcam-${typeWebcam}.jpg`,
      fileDirectory: FilesystemDirectory.Data
    });

    // On a device the file will be written and will return a path
    if (download.path) {
      // This will return a base64 !
      const read = await Filesystem.readFile({
        path: `webcam-${typeWebcam}.jpg`,
        directory: FilesystemDirectory.Data
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
