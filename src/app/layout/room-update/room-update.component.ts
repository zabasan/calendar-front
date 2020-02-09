import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Location} from '@angular/common';
import {url} from "../../../environments/environment";
import {FiltersService} from '../../services/filters.service';

@Component({
    selector: 'app-room-update',
    templateUrl: './room-update.component.html',
    styleUrls: ['./room-update.component.scss']
})
export class RoomUpdateComponent implements OnInit {
    public room: any;
    public keys: any;
    public localUrl = '/room/';

    constructor(private router: Router, private http: HttpClient, private _location: Location, private filterService: FiltersService) {
        this.filterService.showFilter(false);
        console.log(this.router.url);
        this.getOne();

    }

    backClicked() {
        this._location.back();
    }

    getRoom() {
        const header = new HttpHeaders(
            {'Content-Type': 'application/json', 'Accept': 'application/json'});

        return this.http.get(`${url.base}${this.router.url}`, {headers: header});
    }

    getOne(): void {
        this.getRoom().subscribe(res => {
            console.log(res);
            this.room = res;
        });
    }

    updateRoom() {
        // const token = localStorage.getItem('token');
        const header = new HttpHeaders(
            {'Content-Type': 'application/json', 'Accept': 'application/json'});

        return this.http.put( `${url.base}${this.localUrl}${this.room.id}` , this.room, {headers: header})
            .subscribe(result => {
                    // const alert = Alert.create(AlertType.SUCCESS, 'Provider ' + result['id'] + ' has been successfully updated', 5000);
                    // this.service.alert(alert);
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

    ngOnInit() {}
}
