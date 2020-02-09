import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Location} from '@angular/common';
import {url} from '../../../environments/environment';
import {GuestClass} from '../../class/guestClass';
import {FiltersService} from '../../services/filters.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-guest-update',
    templateUrl: './guest-update.component.html',
    styleUrls: ['./guest-update.component.scss']
})
export class GuestUpdateComponent implements OnInit {
    public guest: any;
    public keys: any;
    public frontUrl = '/guest/';
    public localUrl = '/guest_booking/';
    public url;
    constructor(private router: Router, private http: HttpClient, private _location: Location, private filterService: FiltersService) {
        this.filterService.showFilter(false);

        console.log(this.router.url);
        this.url = this.router.url.replace(this.frontUrl, this.localUrl);
        this.getOne();

    }

    backClicked() {
        this._location.back();
    }

    getGuest() {
        const header = new HttpHeaders(
            {'Content-Type': 'application/json', 'Accept': 'application/json'});

        return this.http.get(`${url.base}${this.url}`, {headers: header});
    }

    getOne(): void {
        this.getGuest().subscribe(res => {
            console.log(res);
            this.guest = res;
        });
    }

    updateGuest() {
        // const token = localStorage.getItem('token');
        const header = new HttpHeaders(
            {'Content-Type': 'application/json', 'Accept': 'application/json'});
        return this.http.put(`${url.base}${this.localUrl}${this.guest.id}`, this.guest, {headers: header}).subscribe(result => {
                this._location.back();

            },
            err => {
                console.log(err);
            });
    }

    ngOnInit() {
    }
}
