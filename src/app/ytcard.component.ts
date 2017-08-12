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
  channel_id: string;


  constructor(
    private ytcardService: YtcardService,
    private http: HttpClient
  ) { }

  ngOnInit(): any {
    // make http request to get general channel data
    const params = new HttpParams()
      .set('key', 'AIzaSyBaqkklGh0TEBNzhRO6CemxPJA7DWChZdA')
      .set('part', 'snippet')
      .set('order', 'viewCount')
      .set('q', 'surf')
      .set('type', 'channel')
      .set('maxResults', '50');

    let response = this.http.get(
      'https://www.googleapis.com/youtube/v3/search', {
        params: params
      }
    );
    this.channels = this.ytcardService.getChannels(response);
    this.channels.subscribe(data => {

      this.ytcards = data;
      console.log(data);
      let stat_params = new HttpParams()
        .set('key', 'AIzaSyBaqkklGh0TEBNzhRO6CemxPJA7DWChZdA')
        .set('part', 'statistics')
        .set('id', this.ytcardService.getChannelsIDs(data));

      let response_stat = this.http.get(
        'https://www.googleapis.com/youtube/v3/channels', {
          params: stat_params
        }
      );


      //get channel statistics and merge it with ytcards

      this.ytcardService.getChannelStats(response_stat)
        .subscribe(channel_stats => {
          let ytcards_copy = data; ///DELETE LATER
          ////THIS DOESN'T WORK!!!!!
          // channel_stats.map(
          //   card_stats => {
          //     let id = card_stats.channel_id;
          //     let card = ytcards_copy.find(ytcard => ytcard.channel_id = id);
          //     let card_index = ytcards_copy.indexOf(card);
          //     card.subscribers_count = card_stats.subscribers_count;
          //     card.views_count = card_stats.views_count;
          //     card.video_count = card_stats.video_count;
          //     return card
          //   }
          // ).subscribe(data => console.log(data))
          console.log(channel_stats);
          this.ytcards = this.ytcardService.mergeChannelData(channel_stats, this.ytcards, 'stats');
        });

      //get videos for channels

      let video_params = new HttpParams()
        .set('key', 'AIzaSyBaqkklGh0TEBNzhRO6CemxPJA7DWChZdA')
        .set('part', 'snippet')
        .set('channelId', 'UCWljxewHlJE3M7U_6_zFNyA')
        .set('maxResults', '50');

      let response_video = this.http.get(
        'https://www.googleapis.com/youtube/v3/search', {
          params: video_params
        }
      )

      this.ytcardService.getChannelVideo(response_video)
        .subscribe(channel_video => {
          console.log(channel_video);
          let ytcards_copy = data; ///DELETE LATER
          this.ytcards = this.ytcardService.mergeChannelData(channel_video, this.ytcards, 'video');
        });
    });
  }
}
