import { Injectable } from '@angular/core';
import { Promotion } from '../menu/shared/promotion';
import { PROMOTIONS } from '../menu/shared/promotions';


//rxJS
import { Observable, of, pipe } from 'rxjs';
import { delay, catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

// HTTP
import { baseURL } from '../menu/shared/baseURL';
import { ProcessHTPPMsgService } from './process-htppmsg.service';

@Injectable({
  providedIn: 'root'
})


export class PromotionService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTPPMsgService) { }

  // getPromotions(): Observable<Promotion[]> {
    //return Promise.resolve(PROMOTIONS);
   // return new Promise(resolve =>{
     // setTimeout(() => resolve(PROMOTIONS), 2000)
    //});

  //   return of (PROMOTIONS).pipe(delay(2000));
  // }

  // HTTP methods
  getPromotions(): Observable<Promotion[]>{
    return this.http.get<Promotion[]>(baseURL+'promotions')
    .pipe(catchError(this.processHTTPMsgService.handleError))
  }

  // getPromotion(id: string): Observable<Promotion> {
    //return Promise.resolve(PROMOTIONS.filter((promo) => (promo.id === id))[0]);
    //return new Promise(resolve =>{
      //setTimeout(() => resolve(PROMOTIONS.filter((promo) => (promo.id === id))[0]), 2000)
    //});

  //   return of (PROMOTIONS.filter((promo) => (promo.id === id))[0]).pipe(delay(2000));
  // }

  // HTTP method
  getPromotion(id : string): Observable<Promotion>{
    return this.http.get<Promotion>(baseURL+'promotions/'+id)
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }


  // getFeaturedPromotion(): Observable<Promotion> {
    //return Promise.resolve(PROMOTIONS.filter((promotion) => promotion.featured)[0]);
    //return new Promise(resolve =>{
      //setTimeout(() => resolve(PROMOTIONS.filter((promotion) => promotion.featured)[0]), 2000)
    //});
  //   return of (PROMOTIONS.filter((promotion) => promotion.featured)[0]).pipe(delay(2000));
  // }

  // HTTP method
  getFeaturedPromotion(): Observable<Promotion>{
    return this.http.get<Promotion>(baseURL+'promotions?featured=true').pipe(map(promotions=>promotions[0]))
    .pipe(catchError(this.processHTTPMsgService.handleError))
  }
}

