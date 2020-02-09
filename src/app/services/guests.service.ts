import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {url} from '../../environments/environment';
import {Guests} from '../interface/guests';

@Injectable()
export class GuestsService {
    public localUrl = '/guests';
    public header: any;
    public token: any;
    public guests$: Observable<Guests[]>;
    public guestsSubject = new Subject<Guests[]>();


    guests: Guests[];
    constructor(private http: HttpClient) {
        this.token = localStorage.getItem('token');
        this.header = new HttpHeaders(
            {'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': 'Bearer ' + this.token});
        this.guests$ = this.guestsSubject.asObservable();
    }

    gettingGuests() {
        return this.http.get<Guests[]>
        (`${url.base}${this.localUrl}`, {headers: this.header});
    }
}
