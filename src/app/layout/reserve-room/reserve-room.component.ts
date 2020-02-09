import {Component, OnInit} from '@angular/core';
import {CommunicationServiceService} from '../../services/communicationService.service';
import {Guests} from '../../interface/guests';
import {url} from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {GuestClass} from '../../class/guestClass';
import * as moment from 'moment-timezone';
import {Router} from '@angular/router';
import {FiltersService} from '../../services/filters.service';


@Component({
  selector: 'app-reserve-room',
  templateUrl: './reserve-room.component.html',
  styleUrls: ['./reserve-room.component.scss']
})
export class ReserveRoomComponent implements OnInit {
  public guest: any;
  public isNewGuest = false;
  public guest_phone_number: string;
  public localUrl = '/guests';
  public start;
  public end;
  public roomsToBook: any;
  public reservationData: any;
  public discount_percentage: number;
  public total_with_discount: number;
  constructor(private _service: CommunicationServiceService,
              private http: HttpClient, private _router: Router, private filterService: FiltersService) {
      this.filterService.showFilter(false);
    this.getRoomsToBook().then(response => {
        console.log(response);
        this.roomsToBook = response['rooms_to_book'];
        this.start = response['start_date'];
        this.end = response['end_date'];
        this.reservationData = this.getReservationRoomsData();
    });
  }
  reserveRooms() {
      this.guest['start_date'] = moment(this.start, 'Do MMMM YYYY h:mm:ss').format('YYYYMMDD');
      this.guest['end_date'] = moment(this.end, 'Do MMMM YYYY h:mm:ss').format('YYYYMMDD');
      this.guest['rooms'] = this.roomsToBook;
      this.guest['discount_percentage'] = this.discount_percentage || 0;
      console.log(this.guest);

      const header = new HttpHeaders(
          {'Content-Type': 'application/json', 'Accept': 'application/json'});
      return this.http.post(`${url.base}/book_rooms`, this.guest, {headers: header, responseType: 'text'}).subscribe(result => {
            console.log(JSON.parse(result));
            this._service.setArray(JSON.parse(result));
            this._router.navigateByUrl('/reserved');
          },
          err => {

          });

  }

  getRoomsToBook() {
      return Promise.resolve(this._service.getArray());
  }

  getReservationRoomsData() {
      const result = {
          'start': this.start,
          'end': this.end,
          'total_cost': 0,
          'total_days': 0,
          'rooms': []
      };

      this.roomsToBook.forEach(room => {
          const extraGuest = room['default_guests'] - room['room_guests'];
          room['extra_cost'] = extraGuest > 0 ? extraGuest * room['days'] * room['extra_bed_cost'] : 0;

          result['total_cost'] += room['cost'] * room['days'] + room['extra_cost'];
          result['total_days'] = room['days'];
          result['rooms'].push(room);
      });

      return result;
  }

  changeNewClient() {
    if (this.roomsToBook) {
        this.isNewGuest = true;
        this.guest = new GuestClass();
    }
  }

    getGuest() {
        const header = new HttpHeaders(
            {'Content-Type': 'application/json', 'Accept': 'application/json', 'Access-Control-Allow-Origin': 'http://localhost:4200\n'});
        return this.http.get<Guests[]>(`${url.base}${this.localUrl}/guest_phone_number/${this.guest_phone_number}`, {headers: header});
    }

    findGuest() {
        this.getGuest().subscribe(x => {
            this.guest = x['data'];

        });
    }

    backClicked() {
      this.isNewGuest = false;
      this.guest = null;
    }

    discountChange(event) {
        this.total_with_discount = this.reservationData.total_cost * (1 - event / 100);
    }

  ngOnInit() {

  }

}
