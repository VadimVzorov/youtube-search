import { Injectable } from '@angular/core';

import { Ytcard } from './ytcard';
import { YTCARD } from './yt-data';

const api_url:string = 'https://www.googleapis.com/youtube/v3/search';
const api_key:string = 'AIzaSyBaqkklGh0TEBNzhRO6CemxPJA7DWChZdA';


@Injectable()
export class YtcardService {

  getCards(): Ytcard[] {
    return YTCARD;
  }

}
