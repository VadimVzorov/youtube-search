import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/map';

import { Ytcard } from './ytcard';
import { YTCARD } from './yt-data';
import { YtcardService } from './ytcard.service';

@Component({
  selector: 'ytcard',
  templateUrl: './ytcard.component.html',
  providers: [YtcardService]
})
export class YtcardComponent implements OnInit {

  ytcards: Ytcard[];
  channels: object[];

  constructor(
    private ytcardService: YtcardService,
    private http: HttpClient
  ) { }

  ngOnInit(): any {
    this.http.get('https://www.googleapis.com/youtube/v3/search?key=AIzaSyBaqkklGh0TEBNzhRO6CemxPJA7DWChZdA&part=snippet&order=rating&&q=surf&type=channel&maxResults=50')
    .map(data => {
      return data['items'];
    }).subscribe(data => {
      console.log(data)
    });
    //
    // .subscribe(data => {
    //   this.channels = data['items'];
    //   return data['items'];
    // })

  }
}
