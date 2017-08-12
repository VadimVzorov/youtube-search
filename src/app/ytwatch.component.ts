import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpParams } from '@angular/common/http';
import 'rxjs/Rx';

import { Ytcard } from './ytcard';
import { YtwatchService } from './ytwatch.service';

@Component({
  selector: 'ytwatch',
  templateUrl: './ytwatch.component.html',
  providers: [YtwatchService]
})
export class YtwatchComponent {

  @Input() channel_id: string;
  videoInfo: object;

  constructor(
    private ytwatchService: YtwatchService,
    private http: HttpClient
  ) { }

  onClickWatch(channel_id): void {
    const video_params = new HttpParams()
      .set('key', 'AIzaSyBaqkklGh0TEBNzhRO6CemxPJA7DWChZdA')
      .set('part', 'snippet')
      .set('channelId', channel_id)
      .set('maxResults', '1')
      .set('order', 'viewCount')
      .set('type', 'video');

    const video_response = this.http.get(
      'https://www.googleapis.com/youtube/v3/search', {
        params: video_params
      }
    );

    this.ytwatchService.getVideoInfo(video_response)
      .subscribe(videoInfo => {
        console.log(videoInfo)
        return this.videoInfo = videoInfo;
      });

  }

}
