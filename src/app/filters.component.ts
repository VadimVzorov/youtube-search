import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Filter } from './filter';
import { CurrentStep } from './current-step';
import { FilterService } from './filter.service';
import { StepService } from './step.service';
import { YtcardService } from './ytcard.service';

@Component({
  selector: 'filters',
  templateUrl: './filters.component.html',
  providers: [FilterService, StepService, YtcardService],
  styleUrls: ['./filters.component.css'],
})
export class FiltersComponent implements OnInit {
  filters: Filter[];
  filter: Filter;
  filters_length: number;
  status: boolean;
  input_value: '123';
  error: string;

  constructor(
    private filterService: FilterService,
    private stepService: StepService,
    private ytcardService: YtcardService,
    private router: Router
  ) { }

  checkStep(): void {
    let current_step = this.filter.id + 1;
    this.stepService.updateStep(current_step, this.filters_length);
  }

  getFilters(): void {
    this.filters = this.filterService.getFilters();
  }

  ngOnInit(): any {
    this.getFilters();
    this.filter = this.filters[0];
    this.filters_length = this.filters.length;
    this.checkStep();
  }

  onClickSkip(): void {
    this.error = '';
    let current_step = this.filter.id + 1;
    this.filter = this.filters[current_step];
    //var indicating current step in filters selection
    this.status = this.filterService.stepChecker(this.filters_length, current_step);
    this.checkStep();
  }

  onClickSubmit(input_value): void {
    if (!input_value) {
      this.error = 'Please fill in';
    } else {
      this.error = '';
      let index = this.filter.id;
      this.filters[index].answer = input_value;
      let current_step = this.filter.id + 1;
      this.filter = this.filters[current_step];
      this.input_value = null;
      this.checkStep();
      console.log(this.filters);
    }
  }

  onClickSearch(input_value): void {
    let index = this.filter.id;
    this.filters[index].answer = input_value;
    let link = ['/searchresults'];
    this.router.navigate(link);
  }

}
