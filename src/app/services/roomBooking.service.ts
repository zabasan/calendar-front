import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { RoomBooking } from '../interface/roomBooking';
import { Observable } from 'rxjs/Observable';
import {RoomBookingClass} from '../class/roomBookingClass';
import {FiltersService} from './filters.service';
import {Subject} from 'rxjs/Subject';
import {url} from '../../environments/environment';

@Injectable()
export class RoomBookingService {
    public localUrl = '/bookings';
    public header: any;
    public token: any;
    public limit = 20;
    public skip = 0;
    public params = new HttpParams().set('limit', this.limit.toString()).set('skip', this.skip.toString());
    public reservations$: Observable<RoomBooking[]>;
    public reservationsSubject = new Subject<RoomBooking[]>();


    reservations: RoomBooking[];
    constructor(private http: HttpClient, private filterService: FiltersService) {
        this.token = localStorage.getItem('token');
        this.header = new HttpHeaders(
            {'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': 'Bearer ' + this.token});
        this.reservations$ = this.reservationsSubject.asObservable();
    }

    gettingReservations(filters) {
        // console.log('resssss');
        this.params = new HttpParams().set('limit', this.limit.toString()).set('skip', this.skip.toString());
        this.params = this.filterService.getFiltersparams(filters, this.params);
        return this.http.get<RoomBooking[]>
        (`${url.base}${this.localUrl}`, {headers: this.header, params: this.params});
    }

    deleteReservation(id: RoomBooking | number) {
        return this.http.delete<RoomBooking[]>(`${url.base}/booking/${id}`, {headers: this.header});
    }
}
