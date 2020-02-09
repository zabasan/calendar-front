import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {url} from '../../environments/environment';
import {Rooms} from '../interface/rooms';

@Injectable()
export class RoomsService {
    public localUrl = '/rooms';
    public header: any;
    public token: any;
    public rooms$: Observable<Rooms[]>;
    private roomsSubject = new Subject<Rooms[]>();


    rooms: Rooms[];
    private params: { start_date: any; end_date: any };
    constructor(private http: HttpClient) {
        this.token = localStorage.getItem('token');
        this.header = new HttpHeaders(
            {'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': 'Bearer ' + this.token});
        this.rooms$ = this.roomsSubject.asObservable();
    }

    gettingRooms(startDate, endDate) {
        this.params = {start_date: startDate, end_date: endDate};
        return this.http.get<Rooms[]>
        (`${url.base}${this.localUrl}/available`, {headers: this.header, params: this.params});
    }
}
