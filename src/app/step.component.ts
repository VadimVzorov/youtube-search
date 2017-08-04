import { Component, OnInit } from '@angular/core';

import { CurrentStep } from './current-step';
import { StepService } from './step.service';

@Component({
  selector: 'step',
  template: '<div>Step {{step_data.current_step}}/{{step_data.steps_count}}</div>{{num}}',
  providers: [StepService]
})
export class StepComponent implements OnInit {

  step_data: CurrentStep;
  num: number;

  constructor(
    private stepService: StepService
  ) { }

  ngOnInit(): any {
    this.step_data = this.stepService.getStepData();
  }

}
