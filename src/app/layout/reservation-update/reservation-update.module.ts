import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservationUpdateRoutingModule } from './reservation-update-routing.module';
import { ReservationUpdateComponent } from './reservation-update.component';
import {FormsModule} from "@angular/forms";
import {PageHeaderModule} from "../../shared/modules";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {NgxDaterangepickerMd} from 'ngx-daterangepicker-material';
import {NgSelectModule} from '@ng-select/ng-select';

@NgModule({


    imports: [
        CommonModule,
        ReservationUpdateRoutingModule,
        FormsModule,
        PageHeaderModule,
        NgbModule,
        NgSelectModule,
        NgxDaterangepickerMd.forRoot(),
    ],
    declarations: [ReservationUpdateComponent]
})
export class ReservationUpdateModule {}
