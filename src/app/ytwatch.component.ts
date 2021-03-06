import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpParams } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';

import 'rxjs/Rx';

import { Ytcard } from './ytcard';
import { YtwatchService } from './ytwatch.service';
import { PopupComponent } from './popup.component';

export interface ConfirmModel {
  title: string;
  message: string;
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ytwatch',
  templateUrl: './ytwatch.component.html',
  styleUrls: ['./ytwatch.component.css'],
  providers: [YtwatchService]
})
export class YtwatchComponent {
  title: string;
  message: string;

  @Input() channel_id: string;
  videoInfo: object;
  baseUrl = 'https://www.youtube.com/embed/';
  url: SafeResourceUrl;


  constructor(
    private ytwatchService: YtwatchService,
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private dialogService: DialogService
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
    document.querySelector('body').style.overflow = "hidden";
    this.ytwatchService.getVideoInfo(video_response)
      .subscribe(videoInfo => {
        this.videoInfo = videoInfo;
        this.url = this.sanitizer
          .bypassSecurityTrustResourceUrl(this.baseUrl + this.videoInfo[0].video_url);
        const disposable = this.dialogService.addDialog(
          PopupComponent,
          {
            url: this.url
          }, {
            closeByClickingOutside: true,
            backdropColor: 'rgba(0, 0, 0, 0.54)'
          }).subscribe( x => {
            document.querySelector('body').style.overflow = "scroll";
          })
      })

  }

}
