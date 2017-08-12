import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


import { Ytcard } from './ytcard';

import 'rxjs/add/operator/map';


@Injectable()
export class YtcardService {

  getChannels(response): any {
    return response.map(
      data => data['items'].map(
        item => {
          const card = {
            channel_id: item.snippet.channelId,
            channel_name: item.snippet.channelTitle,
            profile_pic_url: item.snippet.thumbnails.default.url,
            channel_description: item.snippet.description,
            // video_url: item.id.videoId,
            // video_title: item.snippet.title
          };
          return card;
        }
      )
    );
  }

  getChannelsIDs(channelsData): string {
    return channelsData.map(data => data.channel_id).join(',');
  }

  getChannelStats(response): any {
    return response.map(
      data => data['items'].map(
        item => {
          const card_stat = {
            channel_id: item.id,
            subscribers_count: item.statistics.subscriberCount,
            views_count: item.statistics.viewCount,
            video_count: item.statistics.videoCount
          };
          return card_stat;
        }
      )
    );
  }

  getChannelVideo(response): any {
    return response.map(
      data => data['items'].map(
        item => {
          const video_card = {
            channel_id: item.snippet.channelId,
            video_url: item.id.videoId,
            video_title: item.snippet.title
          };
          return video_card;
        }
      )
    );
  }

  mergeChannelData(channel_data, ytcards, type): any {


    return ytcards.map(
      card => {
        const id = card.channel_id;
        const data_index = channel_data.findIndex(data => data.channel_id === id);
        if (data_index > -1) {
          const data_card = channel_data[data_index];
          card.subscribers_count = data_card.subscribers_count;
          card.views_count = data_card.views_count;
          card.video_count = data_card.video_count;
          channel_data.splice(data_index, 1);
        }
        return card;
      }
    );
  }

}
