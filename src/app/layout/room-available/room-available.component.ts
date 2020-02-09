import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Rooms} from '../../interface/rooms';
import * as moment from 'moment-timezone';
import {url} from '../../../environments/environment';
import {CommunicationServiceService} from '../../services/communicationService.service';
import {FiltersService} from '../../services/filters.service';

@Component({
    selector: 'app-room-available',
    templateUrl: './room-available.component.html',
    styleUrls: ['./room-available.component.scss']
})
export class RoomAvailableComponent implements OnInit {
    public start: any = moment().tz('America/Buenos_Aires').format('YYYY-MM-DD');
    public today: any = moment();
    public tomorrow: any = moment().add(1, 'day');
    public end: any = moment().add(1, 'day').tz('America/Buenos_Aires').format('YYYY-MM-DD');
    public value: Object;
    public date: Object = new Date();
    private roomsAvailable: any = [];
    constructor(private http: HttpClient, private _service: CommunicationServiceService, private filterService: FiltersService) {
        this.filterService.showFilter(false);
    }
    public selected: Object = {start: this.today, end: this.tomorrow};
    public guests = 2;
    public checkbox: any = [];
    public selectedRooms: any = [];

    public popoverTitle = 'Confirm';
    public popoverMessage = 'Are you sure?';
    public confirmClicked;
    public cancelClicked = false;
    private localUrl = '/rooms_available';

    public columns: Array<any> = [{
        name: 'name',
        title: 'Room',
        className: 'text-center'
    }, {
        name: 'cost',
        title: 'Cost',
        className: 'text-center'
    }, {
        name: 'total_guests_allow',
        title: 'Max. Guests',
        className: 'text-center'
    }, {
        name: 'days',
        title: 'Quantity of Days',
        className: 'text-center'
    }, {
        title: 'Guests',
        className: 'text-center'
    }, {
        title: 'Action',
        className: 'text-center'
    }];

    public config: any = {
        paging: true,
        sorting: {columns: this.columns},
        filtering: {filterString: ''},
        className: ['table-striped', 'table-bordered', 'text-center']
    };

    toggleSelected = function (id) {
        let i = this.selectedRooms.indexOf(id);
        if (i > -1) {
            this.selectedRooms.splice(i, 1);
        } else {
            this.selectedRooms.push(id);
        }
    };

    removeRoomFromToogle = function (id, guests, index) {
        let i = this.selectedRooms.indexOf(id);
        if (index > -1 && !guests) {
            this.selectedRooms.splice(i, 1);
            this.checkbox[index] = this.checkbox[index] ? !this.checkbox[index] : this.checkbox[index];
        }
    };

    reserveRooms() {
        const res = {
            'start_date': moment(this.selected['start']).format('Do MMMM YYYY 14:00:00'),
            'end_date': moment(this.selected['end']).format('Do MMMM YYYY 10:00:00'),
            'rooms_to_book': []
    };
        this.selectedRooms.forEach(roomId => res['rooms_to_book'].push(this.roomsAvailable.find(element => element.id == roomId)));

        res['total_days'] = res['rooms_to_book'][0]['days'];
        this._service.setArray(res);
    }

    reserveRoom(room) {
        this._service.setArray({
            'start_date': moment(this.selected['start']).format('Do MMMM YYYY 14:00:00'),
            'end_date': moment(this.selected['end']).format('Do MMMM YYYY 10:00:00'),
            'rooms_to_book': [room],
            'total_days': room.days
        });
    }

    areRoomsAvailable() {
        this.roomsAvailable = [];
        const header = new HttpHeaders(
            {'Content-Type': 'application/json', 'Accept': 'application/json', 'Access-Control-Allow-Origin': 'http://localhost:4200\n'});
        this.http.post<Rooms[]>(`${url.base}${this.localUrl}`, {
            start_date: this.selected['start'].tz('America/Buenos_Aires').format('YYYY-MM-DD'),
            end_date: this.selected['end'].tz('America/Buenos_Aires').format('YYYY-MM-DD'),
            guests: this.guests
        }).subscribe((res) => {
            if (res['status']['available_rooms'].length) {
                this.roomsAvailable = res['status']['available_rooms'];
                this.createCheckboxArray(this.roomsAvailable.length);
                this.roomsAvailable.forEach((room) => {
                    room.default_guests = room.room_guests;
                    room.inputMax = this.createMaxGuestsArray(room.total_guests_allow);

                    return room;
                })
            }
        });
    }

    createMaxGuestsArray(maxGuests) {
        const array = new Array(maxGuests);
        for (let i = 0; i < array.length; i++) {
            array[i] = i + 1;
        }
        return array;
    }

    createCheckboxArray(length) {
        const array = new Array(length);
        for (let i = 0; i < array.length; i++) {
            array[i] = false;
        }
        this.checkbox = array;
    }

    ngOnInit() {
    }
}
