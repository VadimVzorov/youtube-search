import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/Rx';

import { Ytcard } from './ytcard';
import { YtcardService } from './ytcard.service';
import { FILTERS } from './filter-data';

@Component({
  selector: 'ytcard',
  templateUrl: './ytcard.component.html',
  providers: [YtcardService]
})
export class YtcardComponent implements OnInit {

  ytcards: Ytcard[];
  ytcards_storage: Ytcard[];
  ytcards_display: Ytcard[];
  private ytcards_observable= new Subject<Ytcard[]>();
  channels: Observable<Ytcard[]>;
  channel_id: string;
  nextPageToken: string;
  api_attempt = 0;
  private searchTerm = new Subject<string>();

  constructor(
    private ytcardService: YtcardService,
    private http: HttpClient
  ) { }

  getChannels(pageToken): any {
    // make http request to get general channel data
    const params = new HttpParams()
      .set('key', 'AIzaSyBaqkklGh0TEBNzhRO6CemxPJA7DWChZdA')
      .set('part', 'snippet')
      .set('order', 'relevance')
      .set('q', FILTERS[0].answer)
      .set('type', 'channel')
      .set('maxResults', '50')
      .set('pageToken', pageToken);

    const response = this.http.get(
      'https://www.googleapis.com/youtube/v3/search', {
        params: params
      }
    );

    this.ytcardService
      .getNextPageToken(response)
      .subscribe(data => this.nextPageToken = data);

    this.channels = this.ytcardService.getChannels(response);
    this.channels.subscribe(data => {

      this.ytcards_storage = this.ytcards_storage.concat(data);

      const stat_params = new HttpParams()
        .set('key', 'AIzaSyBaqkklGh0TEBNzhRO6CemxPJA7DWChZdA')
        .set('part', 'statistics')
        .set('id', this.ytcardService.getChannelsIDs(data));

      const response_stat = this.http.get(
        'https://www.googleapis.com/youtube/v3/channels', {
          params: stat_params
        }
      );


      // get channel statistics and merge it with ytcards

      this.ytcardService.getChannelStats(response_stat)
        .subscribe(channel_stats => {
          this.ytcards_storage = this.ytcardService
            .mergeChannelData(channel_stats, this.ytcards_storage, 'stats');

          this.ytcards = this.ytcards.concat(
            this.ytcardService
              .filterSubscribersCount(
              this.ytcards_storage,
              FILTERS[1].answer,
              FILTERS[2].answer
              )
          );

          this.ytcards_display = this.ytcards_display.concat(this.ytcards);
          this.addData(this.ytcards);
          console.log('data for api attempt: '+this.api_attempt)
          console.log(this.ytcards)
        });
    });
  }

  ngOnInit(): any {
    this.ytcards = [];
    this.ytcards_storage = [];
    this.ytcards_display = [];
    this.searchTerm
      .debounceTime(1000)
      .map(data => data)
      .subscribe(data =>
        this.ytcards_display = this.ytcardService
          .applyFilter(data, this.ytcards)
      );
    this.getChannels('');
    this.ytcards_observable
      .map(data => data)
      .subscribe(data => {
        if (data.length < 25) {
          if (this.api_attempt < 6) {
            ++this.api_attempt;
            console.log(this.ytcards)
            console.log('need more data')
            console.log('api attempt: ' + this.api_attempt);
            this.getChannels(this.nextPageToken);
          }
        }
      });
  }

  search(input): any {
    this.searchTerm.next(input);
  }

  addData(data): any {
    this.ytcards_observable.next(data);
  }
}
