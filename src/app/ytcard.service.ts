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
            channel_name: item.snippet.channelTitle,
            profile_pic_url: item.snippet.thumbnails.default.url,
            channel_description: item.snippet.description,
            // video_url: item.id.videoId,
            // video_title: item.snippet.title
          }
          return card;
        }
      )
    )
  }

  getChannelsIDs(channelsData): string {
    return channelsData.map(data => data.channel_id).join(',');
  }

  getChannelStats(response): any {
    return response.map(
      data => data['items'].map(
        item => {
          let card_stat = {
            channel_id: item.id,
            subscribers_count: item.statistics.subscriberCount,
            views_count: item.statistics.viewCount,
            video_count: item.statistics.videoCount
          }
          return card_stat;
        }
      )
    )
  }

  getChannelVideo(response): any{
    return response.map(
      data => data['items'].map(
        item => {
          let video_card = {
            channel_id: item.snippet.channelId,
            video_url: item.id.videoId,
            video_title: item.snippet.title
          }
          return video_card;
        }
      )
    )
  }

  mergeChannelData(channel_stats, ytcards, type): any {
    return channel_stats.map(
      card_stats => {
        let id = card_stats.channel_id;
        let card = ytcards.find(ytcard => ytcard.channel_id = id);
        let card_index = ytcards.indexOf(card);
        if (type == 'stats'){
          card.subscribers_count = card_stats.subscribers_count;
          card.views_count = card_stats.views_count;
          card.video_count = card_stats.video_count;
        } else {
          card.video_url = card_stats.video_url;
          card.video_title = card_stats.video_title;
        }
        ytcards.splice(card_index, 1);
        return card
      }
    )
  }


}
