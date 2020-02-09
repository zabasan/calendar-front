import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Location} from '@angular/common';
import {url} from '../../../environments/environment';
import {FiltersService} from '../../services/filters.service';
import {RoomsService} from '../../services/rooms.service';
import {GuestsService} from '../../services/guests.service';
import * as moment from 'moment-timezone';

@Component({
    selector: 'app-reservation-update',
    templateUrl: './reservation-update.component.html',
    styleUrls: ['./reservation-update.component.scss'],
    providers: [RoomsService, GuestsService]
})
export class ReservationUpdateComponent implements OnInit {
    public rooms;
    public reservation: any;
    public keys: any;
    public localUrl = '/booking/';
    public selected: { start: string | any; end: string | any };
    public guests: any;
    public totalCost;
    public invalidInput = false;
    public originalRoom: any;

    constructor(private router: Router, private http: HttpClient,
                private _location: Location, private filterService: FiltersService,
                private _roomsService: RoomsService, private _guestsService: GuestsService) {
        this.filterService.showFilter(false);
        console.log(this.router.url);
        this.getOne();
    }

    backClicked() {
        this._location.back();
    }

    getReservation() {
        const header = new HttpHeaders(
            {'Content-Type': 'application/json', 'Accept': 'application/json'});
        console.log(this.router);

        return this.http.get(`${url.base}${this.router.url.replace('/reservation/', this.localUrl)}`, {headers: header});
    }

    getOne(): void {
        this.getReservation().subscribe(res => {
            console.log(res);
            this.reservation = res;
            this.originalRoom = {
                id: this.reservation.room_booking.room_id,
                room: this.reservation.room_booking.room.name,
                name: this.reservation.room_booking.room.name,
                cost: this.reservation.room_booking.room.cost,
                total_guests_allow: this.reservation.room_booking.room.room_guests + this.reservation.room_booking.room.max_extra_beds,
                room_guests: this.reservation.room_booking.room.room_guests,
                total_cost: this.reservation.room_booking.room_cost,
                days: this.reservation.room_booking.days,
                extra_bed_cost: this.reservation.room_booking.room.extra_data.bed
            };
            this.totalCost = this.reservation.cost * (1 - this.reservation.room_booking.discount_percentage / 100);
            this.selected = {start: this.reservation.start_date, end: this.reservation.end_date};
            this.getRooms();
            // this.getGuests();
        });
    }

    getRooms() {
        this._roomsService.gettingRooms(this.reservation.start_date, this.reservation.end_date).subscribe(x => {
            this.rooms = x['data'];
            this.rooms.push(this.originalRoom);
            console.log(this.rooms);
            // return this.rooms;
        });
    }

    getGuests() {
        this._guestsService.gettingGuests().subscribe(x => {
            this.guests = x['data'];
            console.log(this.guests);
            // return this.rooms;
        });
    }

    updateReservation() {
        // const token = localStorage.getItem('token');
        const header = new HttpHeaders(
            {'Content-Type': 'application/json', 'Accept': 'application/json'});
        console.log(this.reservation);

        this.reservation.start_date = moment(this.selected.start).format('YYYY-MM-DD 00:00:00');
        this.reservation.end_date = moment(this.selected.end).format('YYYY-MM-DD 00:00:00');
console.log(this.reservation);
        return this.http.put( `${url.base}${this.localUrl}${this.reservation.id}` , this.reservation, {headers: header})
            .subscribe(result => {
                    // const alert = Alert.create(AlertType.SUCCESS, 'Provider ' + result['id'] + ' has been successfully updated', 5000);
                    // this.service.alert(alert);
                    // this._location.back();
                // console.log(result);
                    this._location.back();
                },
                err => {
                    this.keys = Object.keys(err.error.errors);
                    // let alert;
                    // this.keys.forEach(key => {
                    //     alert = Alert.create(AlertType.DANGER, `${ err.error.errors[key] }`, 5000);
                    //     this.service.alert(alert);
                    // });
                });
    }

    discountChange(event) {
        this.invalidInput = false;
        if (event > 100 || event < 0) {
            this.invalidInput = true;
        }

        this.reservation.room_booking.extra_beds_cost = this.reservation.room_booking.room.extra_data.bed * this.reservation.room_booking.extra_beds *  this.reservation.room_booking.days;

        this.totalCost = (this.reservation.room_booking.room_cost +  this.reservation.room_booking.extra_beds * this.reservation.room_booking.room.extra_data.bed * this.reservation.room_booking.days) * (1 - event / 100);
    }

    costChange(event) {
        this.invalidInput = false;
        if (event < 0 || event > this.reservation.cost) {
            this.invalidInput = true;
        }
        this.reservation.room_booking.extra_beds_cost = this.reservation.room_booking.room.extra_data.bed * this.reservation.room_booking.extra_beds *  this.reservation.room_booking.days;

        this.reservation.room_booking.discount_percentage = (1 - (event / (this.reservation.room_booking.room_cost +  this.reservation.room_booking.extra_beds * this.reservation.room_booking.room.extra_data.bed * this.reservation.room_booking.days))) * 100;
    }

    extraBedsChange(event) {
        console.log( this.reservation.room_booking.room.extra_data.bed * event);
        this.invalidInput = false;
        if (event > this.reservation.room_booking.room.max_extra_beds || event < 0) {
            this.invalidInput = true;
        }
        this.reservation.room_booking.guests = this.reservation.room_booking.room.room_guests + event;
        this.reservation.room_booking.extra_beds_cost = this.reservation.room_booking.room.extra_data.bed * event * this.reservation.room_booking.days;
        this.totalCost = (this.reservation.room_booking.room_cost +  this.reservation.room_booking.extra_beds_cost) * (1 - this.reservation.room_booking.discount_percentage / 100);

    }

    roomChange(event) {
        this.invalidInput = false;
        const room = event === this.originalRoom.id ? this.originalRoom : this.rooms.find(a => a.id === event);
        this.reservation.room_booking.room.max_extra_beds = room.total_guests_allow - room.room_guests;

        if (this.reservation.room_booking.guests > room.total_guests_allow) {
            this.reservation.room_booking.guests = room.total_guests_allow;
            this.reservation.room_booking.extra_beds = this.reservation.room_booking.room.max_extra_beds;
        }

        this.totalCost = (room.total_cost +  this.reservation.room_booking.extra_beds * this.reservation.room_booking.room.extra_data.bed * this.reservation.room_booking.days) * (1 - this.reservation.room_booking.discount_percentage / 100);
        this.reservation.cost = this.totalCost + this.reservation.room_booking.room.max_extra_beds * this.reservation.room_booking.room.extra_data.bed * this.reservation.room_booking.days;
        this.reservation.room_booking.room_cost = room.total_cost;
        this.reservation.room_booking.extra_beds_cost = this.reservation.room_booking.room.extra_data.bed * this.reservation.room_booking.extra_beds *  this.reservation.room_booking.days;
    }

    ngOnInit() {}
}
