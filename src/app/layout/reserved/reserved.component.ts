import { Component, OnInit } from '@angular/core';
import {CommunicationServiceService} from '../../services/communicationService.service';

@Component({
    selector: 'app-reserved',
    templateUrl: './reserved.component.html',
    styleUrls: ['./reserved.component.scss']
})
export class ReservedComponent implements OnInit {
    public response: any;
    constructor(private _service: CommunicationServiceService) {
        this.getResponse().then(response => {
            this.response = response['data'];
            // this.response1 = {
            //     'rooms_booked': {
            //         'days': 10,
            //         'start_date': '2019-02-14',
            //         'end_date': '2019-02-18',
            //         'reservation_code': 'yuyfwefyiwoe',
            //         'rooms': [{id:1}, {id:2}],
            //         'quantity': 2,
            //         'total_cost': 12000
            //     },
            //     'unavailable_rooms': ['room 1 is unavailable']
            // };
            console.log(this.response);
        });
    }

    getResponse() {
        return Promise.resolve(this._service.getArray());
    }


    ngOnInit() {}
}
