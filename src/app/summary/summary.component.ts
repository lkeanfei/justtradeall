import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    /*
    this.httpService.getFrontPageNewHighLowView().subscribe( (frontPageData :any)=> {
      this.newHighDataSource = frontPageData['newhigh'];
      this.newLowDataSource = frontPageData['newlow'];
    });

    this.httpService.getFrontPageBreakout().subscribe( (frontPageData :any)=> {

      this.staticBoxBreakoutDataSource = frontPageData['staticboxbreakout'];
      this.dynamicBoxBreakoutDataSource = frontPageData['dynamicboxbreakout'];

    })

    this.httpService.getFrontPageTopGainers().subscribe( (frontPageData :any)=> {

      this.topGainersDateSource = frontPageData["topgainers"];
      this.topGainersPctDateSource = frontPageData["topgainerspct"];
    })

    this.httpService.getFrontPageTopLosers().subscribe( (frontPageData :any)=> {

      this.topLosersDateSource = frontPageData["toplosers"];
      this.topLosersPctDateSource = frontPageData["toploserspct"];
    })

    this.httpService.getFrontPageVolume().subscribe( (frontPageData :any)=> {

      this.unusualVolumeDataSource = frontPageData['unusualvolume'];
      this.isLoading = false;
    })
*/
  }

}
