import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { SafeResourceUrl } from '@angular/platform-browser';

import 'rxjs/Rx';

import { Ytcard } from './ytcard';
import { YtwatchService } from './ytwatch.service';

export interface PopupModel {
    url: SafeResourceUrl;
}
@Component({
    templateUrl: './popup.component.html',
    styleUrls: ['./popup.component.css']
})
export class PopupComponent extends DialogComponent<PopupModel, boolean> implements PopupModel {
    url: SafeResourceUrl;
    constructor(dialogService: DialogService) {
        super(dialogService);
    }
}