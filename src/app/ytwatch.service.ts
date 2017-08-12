import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


import { Ytcard } from './ytcard';

import 'rxjs/add/operator/map';

@Injectable()
export class YtwatchService {
  getVideoInfo(response): any {
    return response.map(
      data => data['items'].map(
        item => {
          const video_card = {
            video_url: item.id.videoId,
            video_title: item.snippet.title
          };
          return video_card;
        }
      )
    );
  }
}
