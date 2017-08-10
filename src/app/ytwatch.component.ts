import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpParams } from '@angular/common/http';
import 'rxjs/Rx';

import { Ytcard } from './ytcard';
import { YtcardService } from './ytcard.service';

@Component({
  selector: 'ytwatch',
  template: '{{videoInfo}}',
})
export class YtwatchComponent {

  @Input('videoInfo') videoInfo: object;

}
