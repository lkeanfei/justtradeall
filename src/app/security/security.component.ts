import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpService} from "../shared/httpservice.service";
import {concatMap, map, switchMap, take, tap} from 'rxjs/internal/operators';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.css']
})
export class SecurityComponent implements OnInit, OnDestroy {

  private sub: any;
  fullid: string;
  constructor(private route: ActivatedRoute , private httpService: HttpService) { }

  ngOnInit() {

    // const httpSub = this.httpService.getSecurityView('12345').pipe(
    //   map(prms => prms['fullid'])
    // );



    const newSub = this.route.params.pipe(
       concatMap(prms =>  this.httpService.getSecurityView(prms['fullid']) ),
    );

    newSub.subscribe( res => {

      console.log('res ' + res);
      console.log(res);
      console.log('Subscription ' + res['fullid']);

    });



  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
