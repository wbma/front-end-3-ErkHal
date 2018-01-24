import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MediaService {

  test = 'Howdy';

  apiUrl = 'http://media.mw.metropolia.fi/wbma';
  mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

  constructor(private http: HttpClient) { }

  printWord() {
    return this.test;
  }

  getAllMedia() {
    return this.http.get(this.apiUrl + '/media');
  }
}
