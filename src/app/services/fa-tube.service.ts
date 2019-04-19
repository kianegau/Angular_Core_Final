import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FaTubeService {
  constructor(private http: HttpClient) {}
  public url = 'https://www.googleapis.com/youtube/v3/search';
  public urlPlay = 'https://www.googleapis.com/youtube/v3/videos';

  playVideos(id: string, api: string): Observable<any> {
    const uri = `${
      this.urlPlay
    }?part=snippet%2CcontentDetails%2Cstatistics&id=${id}&key=${api}`;
    return this.http.get<any>(uri);
  }

  getRelatedById(id: string, api: string) {
    const uri = `${this.url}?part=snippet&key=${api}&relatedByVideoId=${id}`;
    return this.http.get<any>(uri);
  }

  // tslint:disable-next-line:variable-name
  orderVideos(order: string, key: string, api: string, number: string) {
    const uri = `${
      this.url
    }?part=snippet&maxResults=${number}&order=${order}&q=${key}&key=${api}`;
    return this.http.get<any>(uri);
  }
  checkApiKey(api: string) {
    const uri = `${this.url}?part=snippet&key=${api}`;
    return this.http.get<any>(uri);
  }
}
