import { Injectable } from '@angular/core';
import '@capacitor-community/http';
import { HttpDownloadFileResult } from '@capacitor-community/http';
import { FilesystemDirectory, Plugins } from '@capacitor/core';
import { environment } from 'src/environments/environment';

import { ApiEvent } from '../models/event';


const { Http, Filesystem } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  async getEvent(urlEvent: string): Promise<ApiEvent[]> {
    const response = await Http.request({
      method: 'GET',
      url: urlEvent,
      params: {
        mode: 'no-cors'
      }
    });
    return response.data;
  }

  async getHoraireBacs(): Promise<any> {
    const response = await Http.request({
      method: 'GET',
      url: environment.apiUrlHoraire,
      params: {
        mode: 'no-cors'
      }
    });
    return response.data;
  }

  async getLatestWebcam(typeWebcam: string): Promise<string> {
    const download: HttpDownloadFileResult = await Http.downloadFile({
      url: environment.apiUrlEvent + `/webcam?id=${typeWebcam}`,
      filePath: 'webcam.jpg',
      fileDirectory: FilesystemDirectory.Data
    });

    // On a device the file will be written and will return a path
    if (download.path) {
      // This will return a base64 !
      const read = await Filesystem.readFile({
        path: 'webcam.jpg',
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
