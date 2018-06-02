import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {HttpService} from '../shared/httpservice.service';
import {MatPaginator, MatTableDataSource} from '@angular/material';

export interface CompanyData {
  id: string;
  name: string;
  shares: number;
  percentage: number;
}

@Component({
  selector: 'app-shareholdings',
  templateUrl: './shareholdings.component.html',
  styleUrls: ['./shareholdings.component.css']
})
export class ShareholdingsComponent implements OnInit {

  companyField: FormControl;
  shareholderField: FormControl;
  showByStock: boolean;
  hasResults: boolean;
  startSearch: boolean;
  selStyles: any = [];
  rowList : any = []
  companyDataSource: any;
  companyColumns = ['id', 'name', 'shares', 'percentage'];



  constructor(private httpService: HttpService) {

    this.hasResults = false;
    this.startSearch = false;
    this.showByStock = true;
    this.selStyles.push('aqua');
    this.selStyles.push('white');

    this.companyDataSource = new MatTableDataSource<CompanyData>( );
  }



  searchBy(index:number) {

    if(index === 0) {
      this.showByStock = true;
      this.selStyles[0] = 'aqua';
      this.selStyles[1] = 'white';

    }else if ( index === 1){
      this.showByStock = false;
      this.selStyles[1] = 'aqua';
      this.selStyles[0] = 'white';
    }
  }

  onSearchCompany() {
    console.log('Search company ' + this.companyField.value);

    this.httpService.searchCompany(this.companyField.value).subscribe( (data:any) => {

      this.companyDataSource.data = data['results'];
      this.hasResults = true;



    });
  }

  processNumber(num: number) {

  }

  onSearchShareholders() {
    console.log('Search shareholders ' + this.shareholderField.value);
  }

  ngOnInit() {
    this.companyField = new FormControl();
    this.shareholderField = new FormControl();
  }

}
