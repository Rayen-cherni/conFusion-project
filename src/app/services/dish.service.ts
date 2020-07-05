import { Injectable } from '@angular/core';
import { Dish } from '../menu/shared/dish';
//import { DISHES } from '../menu/shared/dishes';

//provide the data from the server 
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../menu/shared/baseURL'

//rxJS
import { Observable, of } from 'rxjs';
//Enable us to delay the emitting of the item from  our observable 
import { delay } from 'rxjs/operators';

// Error
import {  catchError } from 'rxjs/operators';
import { ProcessHTPPMsgService } from './process-htppmsg.service';


// To define a class as a service you need to use @Injectable
@Injectable({
  providedIn: 'root'
})
export class DishService {

  

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTPPMsgService) { }

  //Using promises

  //getDishes(): Promise<Dish[]> {
    //return new Promise(resolve => {
      //Simulate server latency with 2 second delay
     // setTimeout(() => resolve(DISHES),2000)
    //});
  //}

  //Using observable to return a promises

  //getDishes():  Promise<Dish[]> {
   // return of (DISHES).pipe(delay(2000)).toPromise();
  //}

  //Using observable to return a observable 
  //getDishes():  Observable<Dish[]> {
    //return of (DISHES).pipe(delay(2000));
  //}

  
  //***********HTTP *****************/
  getDishes():  Observable<Dish[]> {
    return this.http.get<Dish[]>(baseURL + 'dishes')
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }
  //Using promises
  //getDish( id: number): Promise<Dish> {

    //return Promise.resolve(DISHES.filter((dish) => (dish.id === id))[0]); "Old version"
    //return new Promise(resolve =>{
      //setTimeout(() => resolve(DISHES.filter((dish) => (dish.id === id))[0]), 2000)
    //});
    
  //}

  //Using observable to return a promises

  //getDish( id: number): Promise<Dish> {
   // return of (DISHES.filter((dish) => (dish.id === id))[0]).pipe(delay(2000)).toPromise();
  //}

  //Using observable to return a Observable
 // getDish( id: string): Observable<Dish> {
   // return of (DISHES.filter((dish) => (dish.id === id))[0]).pipe(delay(2000));
  //}

  //***********HTTP *****************/
  getDish(id: string):  Observable<Dish> {
    return this.http.get<Dish>(baseURL + 'dishes/'+id)
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

//Using promises
//  getFeaturedDish(): Promise<Dish> {

    //return Promise.resolve(DISHES.filter((dish) => dish.featured)[0]);
    //return new Promise(resolve =>{
     // setTimeout(() => resolve(DISHES.filter((dish) => dish.featured)[0]), 2000)
    //});

  //}

  //Using observable to return a promises
  //getFeaturedDish(): Promise<Dish> {
    //return of (DISHES.filter((dish) => dish.featured)[0]).pipe(delay(2000)).toPromise();
  //}


  //Using observable to return a observable
  //getFeaturedDish(): Observable<Dish> {
    //return of (DISHES.filter((dish) => dish.featured)[0]).pipe(delay(2000));
  //}


  //***********HTTP *****************/
  getFeaturedDish():  Observable<Dish> {
    return this.http.get<Dish>(baseURL + 'dishes?featured=true').pipe(map(dishes => dishes[0]))
    .pipe(catchError(this.processHTTPMsgService.handleError))
    ;
  }


 // getDishIds(): Observable<string[] | any> {
   // return of(DISHES.map(dish => dish.id));

  //}

  //***********HTTP *****************/
getDishIds(): Observable<string[] | any> {
    return this.getDishes().pipe(map(dishes=>dishes.map(dish=>dish.id)))
    .pipe(catchError(error => error));

  }

  putDish(dish: Dish): Observable<Dish> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.put<Dish>(baseURL + 'dishes/' + dish.id, dish, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));

  }
  
}
