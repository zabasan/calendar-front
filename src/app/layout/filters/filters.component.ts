import {Component, OnInit} from '@angular/core';
import {FiltersService} from '../../services/filters.service';
import {RoomBookingService} from '../../services/roomBooking.service';

@Component({
    selector: 'app-filters',
    templateUrl: './filters.component.html',
    styleUrls: ['./filters.component.scss'],
    providers: [RoomBookingService]
})
export class FiltersComponent implements OnInit {
    public showFilter: boolean;
    public filtersToShow: object;
    public filters: any;
    public aux: any = {};
    public model;
    public reservations: any;
    public providerList: any;
    constructor(private filter: FiltersService, private roomBooking: RoomBookingService) {
        this.filters = {clients: null, status: null, model: null};
        this.filter.showFilter$.subscribe((boolean) => {
            this.showFilter = boolean;
        });
        this.filter.filtersToShow$.subscribe((object) => {
            this.filtersToShow = object;
            this.model = this.filtersToShow['model'];
            console.log(this.model);
             this.getFilters();
        });
    }
    // getClients() {
    //     const id = null;
    //     this.clientsList.gettingClients(id, null).subscribe(x => {
    //         console.log(x);
    //         this.clientList = x['data'];
    //     });
    // }
    // getProviders() {
    //     this.providersList.gettingProviders(null).subscribe(x => {
    //         console.log(x);
    //         this.providerList = x['data'];
    //     });
    // }
    //
    getReservations() {
        this.roomBooking.gettingReservations(null).subscribe(x => {
           console.log(x);
           this.reservations = x['data'];
        });
    }

    getFilters() {

        if (this.filtersToShow['reservations'] === true) {
            this.getReservations();
        } else if (this.filtersToShow['providers'] === true) {
        }
    }

    ngOnInit() {
        if (this.showFilter) {
            this.getFilters();
        }
    }

    transformDStartDateFilter(filter) {
        if (typeof filter === 'object') {
            if (filter) {
                const month = ('0' + filter.month).slice(-2);
                const day = ('0' + filter.day).slice(-2);
                filter = `${filter.year}${month}${day}`;
            }
        }
        return filter;
    }

    applyFilter() {
       /* this.filters.keys(filter => {
            console.log(filter);
        });*/

       Object.keys(this.aux).forEach(auxFilter => {
           if (auxFilter === 'start_date') {
               this.filters[auxFilter] = this.transformDStartDateFilter(this.aux[auxFilter]);
           } else {
               this.filters[auxFilter] = this.aux[auxFilter];
           }
       });

       Object.keys(this.filters).forEach(filter => {
           if (filter === this.model + '[]') {
               this.filters['id[]'] = this.filters[filter];
               delete this.filters[filter];
           }
       });
        console.log(this.filters);
        this.filter.getFilters(this.filters);
    }
}
