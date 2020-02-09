import { Component, OnInit } from '@angular/core';
import {Rooms} from '../../interface/rooms';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { url } from '../../../environments/environment';
import {FiltersService} from '../../services/filters.service';

@Component({
    selector: 'app-rooms',
    templateUrl: './rooms.component.html',
    styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {
    rooms: Rooms[];
    public localUrl = '/rooms';
    constructor(private http: HttpClient, private filterService: FiltersService) {
        this.filterService.showFilter(false);

    }

    public columns: Array<any> = [{
        name: 'id',
        title: 'id',
        className: 'text-center'
    }, {
        name: 'name',
        title: 'Room',
        className: 'text-center'
    }, {
        name: 'calendar_id',
        title: 'Google Calendar',
        className: 'text-center'
    }, {
        name: 'cost',
        title: 'Cost',
        className: 'text-center'
    }, {
        name: 'room_guests',
        title: 'Guests',
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

    gettingRooms() {
        const header = new HttpHeaders(
            {'Content-Type': 'application/json', 'Accept': 'application/json', 'Access-Control-Allow-Origin': 'http://localhost:4200\n'});
       return this.http.get<Rooms[]>(`${url.base}${this.localUrl}`, {headers: header});
    }
    deleteRoom(id: Rooms | number) {
        const header = new HttpHeaders(
            {'Content-Type': 'application/json', 'Accept': 'application/json', 'Access-Control-Allow-Origin': 'http://localhost:4200\n'});
        return this.http.delete<Rooms[]>(`${url.base}/room/${id}`, {headers: header});
    }

    delete(room: Rooms): void {
        this.deleteRoom(room).subscribe(result => {
            console.log(result + 'room:' + room);
            this.getRooms();
        });
    }

    getRooms(): void {
        this.gettingRooms().subscribe(x => {
            console.log(x);
            this.rooms = x['data'];

        });
    }

    ngOnInit() {
        this.getRooms();
    }
}
