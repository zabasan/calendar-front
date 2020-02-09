import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Location} from '@angular/common';
import {url} from "../../../environments/environment";
import {RoomClass} from "../../class/roomClass";
import {FiltersService} from '../../services/filters.service';

@Component({
    selector: 'app-room-create',
    templateUrl: './room-create.component.html',
    styleUrls: ['./room-create.component.scss']
})
export class RoomCreateComponent implements OnInit {
    public room: any;
    public keys: any;
    public localUrl = '/room/create';
    constructor(private http: HttpClient, private _location: Location, private filterService: FiltersService) {
        this.filterService.showFilter(false);

    }

    backClicked() {
        this._location.back();
    }

    createRoom() {
        // const token = localStorage.getItem('token');
        const header = new HttpHeaders(
            {'Content-Type': 'application/json', 'Accept': 'application/json'});
        return this.http.post(`${url.base}${this.localUrl}`, this.room,{headers: header}).subscribe(result => {
                this._location.back();

            },
            err => {
                this.keys = Object.keys(err.error.errors);
                this.keys.forEach(key => {
                    // alert = Alert.create(AlertType.DANGER, `Auto dismissing <b>${ err.error.errors[key] }</b>.`, 5000);
                    // this.service.alert(alert);
                    console.log(err.error.errors[key]);
                });
            });
    }

    ngOnInit() {
        this.room = new RoomClass();
    }
}
