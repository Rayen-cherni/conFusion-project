import { Injectable } from '@angular/core';
import { ProcessHTPPMsgService } from './process-htppmsg.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Feedback, ContactType } from '../menu/shared/feedback';
import { Observable, pipe } from 'rxjs';
import { baseURL } from '../menu/shared/baseURL';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTPPMsgService) { }

  submitFeedback(feedback: Feedback):Observable<Feedback>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post<Feedback>(baseURL+'feedback',feedback,httpOptions)
    .pipe(catchError(this.processHTTPMsgService.handleError))

  }
}
