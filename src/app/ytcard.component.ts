import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpParams } from '@angular/common/http';
import 'rxjs/Rx';

import { Ytcard } from './ytcard';
import { YtcardService } from './ytcard.service';

@Component({
  selector: 'ytcard',
  templateUrl: './ytcard.component.html',
  providers: [YtcardService]
})
export class YtcardComponent implements OnInit {

  ytcards: Ytcard[];
  channels: Observable<Ytcard[]>;


  constructor(
    private ytcardService: YtcardService,
    private http: HttpClient
  ) { }

  ngOnInit(): any {
    let params =new HttpParams();
    params.set('key', 'AIzaSyBaqkklGh0TEBNzhRO6CemxPJA7DWChZdA');
    params.set('part', 'snippet');
    params.set('order', 'rating');
    params.set('q', 'surf');
    params.set('type', 'channel');
    params.set('maxResults', '50');
    console.log(params.toString())
    console.log(params.get('key'))
    let response = this.http.get(
      'https://www.googleapis.com/youtube/v3/search?',{
        params: params
      }
    );
    this.channels = this.ytcardService.getChannels(response);
    this.channels.subscribe(data => console.log(data));
  }
}
