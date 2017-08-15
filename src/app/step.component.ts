import { Component, OnInit } from '@angular/core';

import { CurrentStep } from './current-step';
import { StepService } from './step.service';

@Component({
  selector: 'step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.css'],
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
