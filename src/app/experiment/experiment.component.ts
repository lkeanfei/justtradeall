import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-experiment',
  templateUrl: './experiment.component.html',
  styleUrls: ['./experiment.component.css']
})
export class ExperimentComponent implements OnInit {

  bOrderFlowLoading = true;
  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  constructor() { }

  ngOnInit() {
  }

}
