import { Component, OnInit } from '@angular/core';
import {Guests} from '../../interface/guests';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {url} from '../../../environments/environment';
import {FiltersService} from '../../services/filters.service';

@Component({
    selector: 'app-guests',
    templateUrl: './guests.component.html',
    styleUrls: ['./guests.component.scss']
})
export class GuestsComponent implements OnInit {
    guests: Guests[];
    public localUrl = '/guests';
    constructor(private http: HttpClient, private filterService: FiltersService) {
        this.filterService.showFilter(false);

    }

    public columns: Array<any> = [{
        name: 'id',
        title: 'id',
        className: 'text-center'
    }, {
        name: 'guest_first_name',
        title: 'Name',
        className: 'text-center'
    }, {
        name: 'guest_last_name',
        title: 'Last Name',
        className: 'text-center'
    }, {
        name: 'guest_phone_number',
        title: 'Phone Number',
        className: 'text-center'
    }, {
        name: 'email',
        title: 'Email',
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

    getGuests() {
        const header = new HttpHeaders(
            {'Content-Type': 'application/json', 'Accept': 'application/json'});
       return this.http.get<Guests[]>(`${url.base}${this.localUrl}`, {headers: header});
    }

    ngOnInit() {
        this.getGuests().subscribe(x => {
            console.log(x);
            this.guests = x['data'];

        });
        console.log('bb');
    }
}
