import { Injectable } from '@angular/core';

import { CurrentStep } from './current-step';
import { CURRENTSTEP } from './current-step-data';

@Injectable()
export class StepService {

  getStepData(): CurrentStep {
    return CURRENTSTEP;
  }


  updateStep(current_step, steps_count): void {
    CURRENTSTEP.current_step = current_step;
    CURRENTSTEP.steps_count = steps_count;
    console.log(CURRENTSTEP);
  }

}
