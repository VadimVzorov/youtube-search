import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


import { Ytcard } from './ytcard';

import 'rxjs/add/operator/map';

const api_url:string = 'https://www.googleapis.com/youtube/v3/search';
const api_key:string = 'AIzaSyBaqkklGh0TEBNzhRO6CemxPJA7DWChZdA';


@Injectable()
export class YtcardService {

  getChannels(response): any {
    return response.map(
      data => data['items'].map(
        item => {
          let card = {
            channel_id: item.snippet.channelId,
            channel_name: item.snippet.title,
            profile_pic_url: item.snippet.thumbnails.default.url,
            channel_description: item.snippet.description
          }
          return card;
        }
      )
    )
  }

}
