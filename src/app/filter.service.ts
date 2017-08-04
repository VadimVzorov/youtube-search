import { Injectable } from '@angular/core';

import { Filter } from './filter';
import { CurrentStep } from './current-step';
import { FILTERS } from './filter-data';
import { CURRENTSTEP } from './current-step-data';

@Injectable()
export class FilterService {

  getFilters(): Filter[] {
    return FILTERS;
  }

  getFilter(filters: Filter[]): void {
    let len = filters.length;
    console.log(len);
  }

  stepChecker(len: number, current_step: number): boolean {
    let status: boolean;
    if (current_step < len){
      status = false;
    } else {
      status = true;
    }
    return status;
  }

}
