import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpParams } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import 'rxjs/Rx';

import { Ytcard } from './ytcard';
import { YtwatchService } from './ytwatch.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ytwatch',
  templateUrl: './ytwatch.component.html',
  providers: [YtwatchService]
})
export class YtwatchComponent {

  @Input() channel_id: string;
  videoInfo: object;
  baseUrl = 'https://www.youtube.com/embed/';
  url: SafeResourceUrl;


  constructor(
    private ytwatchService: YtwatchService,
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) {}

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
        this.videoInfo = videoInfo;
        this.url = this.sanitizer
          .bypassSecurityTrustResourceUrl(this.baseUrl + this.videoInfo[0].video_url);
      });

  }

}
