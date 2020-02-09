import { Component, OnInit } from '@angular/core';
import {Rooms} from '../../interface/rooms';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {url} from '../../../environments/environment';
import * as moment from 'moment-timezone';
import {FiltersService} from '../../services/filters.service';
import {RoomBookingService} from '../../services/roomBooking.service';

@Component({
    selector: 'app-reservations',
    templateUrl: './reservations.component.html',
    styleUrls: ['./reservations.component.scss'],
    providers: [RoomBookingService]
})
export class ReservationsComponent implements OnInit {
    rooms: Rooms[];
    public localUrl = '/bookings';
    public filtersToShow: object = {clients: false, reservation_code: true, status: false, model: 'reservations'};
    public filters: any = {start_date: moment().format('YYYYMMDD')};
    public aux: any = {};
    constructor(private http: HttpClient, private filterService: FiltersService, private roomBookingService: RoomBookingService) {
        console.log('constructor');
        const today = moment();
        // this.aux.start_date = {year: moment().format('YYYY'), month: moment().format('MM'), day: moment().format('DD')};
        console.log(this.aux.start_date);
        this.filterService.showFilter(true);
        this.filterService.filterToShow(this.filtersToShow);
        this.filterService.filters$.subscribe((object) => {
            this.filters = object;
            console.log('--->' + this.filters);
            this.getReservations();
        });
    }
    // public showFilter = true;

    public columns: Array<any> = [{
        name: 'id',
        title: 'id',
        className: 'text-center'
    }, {
        name: 'name',
        title: 'Room',
        className: 'text-center'
    }, {
        name: 'start_date',
        title: 'Start Date',
        className: 'text-center'
    }, {
        name: 'end_date',
        title: 'End Date',
        className: 'text-center'
    }, {
        name: 'days',
        title: 'Days',
        className: 'text-center'
    }, {
        name: 'room_guests',
        title: 'Guests',
        className: 'text-center'
    }, {
        name: 'reservation_code',
        title: 'Reservation Code',
        className: 'text-center'
    }, {
        name: 'action',
        title: 'Actions',
        className: 'text-center'
    }
    ];

    public config: any = {
        paging: true,
        sorting: {columns: this.columns},
        filtering: {filterString: ''},
        className: ['table-striped', 'table-bordered', 'text-center']
    };

    getRooms() {
        const today = moment().format('YYYYMMDD');
        const header = new HttpHeaders(
            {'Content-Type': 'application/json', 'Accept': 'application/json', 'Access-Control-Allow-Origin': 'http://localhost:4200\n'});
       return this.http.get<Rooms[]>(`${url.base}${this.localUrl}?start_date=${today}`, {headers: header});
    }

    getReservations() {
        // this.getRooms().subscribe(x => {
        //     console.log(x);
        //
        //     this.filters = this.filterService.transformIdFilter(this.filters, this.filtersToShow['model']);
        //
        //     this.rooms = x['data'];
        //
        // });
        if (this.filters.reservation_code) {
            this.filters.start_date = null;
        } else {
            this.filters.start_date =  this.filters.start_date || moment().format('YYYYMMDD');
        }
        console.log(this.filters.start_date);

        this.roomBookingService.gettingReservations(this.filters).subscribe(x => {
            this.filters = this.filterService.transformIdFilter(this.filters, this.filtersToShow['model']);
            this.rooms = x['data'];
            // return this.rooms;
        });
    }

    delete(id) {
        this.roomBookingService.deleteReservation(id).subscribe(result => {
            console.log(result + 'client:' + id);
            this.getReservations();
        });
    }

    ngOnInit() {
        console.log('oninit');
        this.getReservations();
    }
}
