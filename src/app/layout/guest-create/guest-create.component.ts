import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Location} from '@angular/common';
import {url} from '../../../environments/environment';
import {GuestClass} from '../../class/guestClass';
import {FiltersService} from '../../services/filters.service';

@Component({
    selector: 'app-guest-create',
    templateUrl: './guest-create.component.html',
    styleUrls: ['./guest-create.component.scss']
})
export class GuestCreateComponent implements OnInit {
    private guest: any;
    public keys: any;
    private localUrl = '/guest_booking/create';
    constructor(private http: HttpClient, private _location: Location, private filterService: FiltersService) {
        this.filterService.showFilter(false);

    }

    backClicked() {
        this._location.back();
    }

    createGuest() {
        // const token = localStorage.getItem('token');
        const header = new HttpHeaders(
            {'Content-Type': 'application/json', 'Accept': 'application/json'});
        return this.http.post(`${url.base}${this.localUrl}`, this.guest, {headers: header}).subscribe(result => {
                this._location.back();

            },
            err => {
                console.log(err);
            });
    }

    ngOnInit() {
        this.guest = new GuestClass();
    }
}
