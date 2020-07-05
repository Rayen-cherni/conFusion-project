import { Injectable } from '@angular/core';
import { Leader } from '../menu/shared/leader';
import { LEADERS } from '../menu/shared/leaders';

//rxJS
import { Observable, of } from 'rxjs';
import { delay, catchError, map } from 'rxjs/operators';
import { baseURL } from '../menu/shared/baseURL';
import { HttpClient } from '@angular/common/http';
import { ProcessHTPPMsgService } from './process-htppmsg.service';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTPPMsgService) { }

  // getLeaders(): Observable<Leader[]> {
    //Simulte server latency with 2 second delay
    //return Promise.resolve(LEADERS);
    //return new Promise(resolve =>{
      //setTimeout(() => resolve(LEADERS), 2000)
    //});

  //   return of (LEADERS).pipe(delay(2000));
  // }

  // HTPP method
  getLeaders(): Observable<Leader[]>{
    return this.http.get<Leader[]>(baseURL+'leadership')
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  // getLeader(id: string): Observable<Leader>{
    //return Promise.resolve(LEADERS.filter((leader) => (leader.id === id))[0]);
    //return new Promise(resolve => {
      //setTimeout(() => resolve(LEADERS.filter((leader) => (leader.id === id))[0]), 2000)
    //});

  //   return of (LEADERS.filter((leader) => (leader.id === id))[0]).pipe(delay(2000));
  // }

  // HTTP method
  getLeader(id: string):Observable<Leader>{
    return this.http.get<Leader>(baseURL+'leadership/'+id)
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }


  
  // getFeaturedLeader(): Observable<Leader> {
    //return Promise.resolve(LEADERS.filter((leader) => leader.featured)[0]);
   // return new Promise(resolve => {
     // setTimeout(() => resolve(LEADERS.filter((leader) => leader.featured)[0]), 2000)
    //});

  //   return of (LEADERS.filter((leader) => leader.featured)[0]).pipe(delay(2000));
  // }
  // HTTP method
  getFeaturedLeader():Observable<Leader>{
    return this.http.get<Leader>(baseURL+'leadership?featured=true').pipe(map(leaders=>leaders[0]))
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
