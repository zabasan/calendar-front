import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomAvailableRoutingModule } from './room-available-routing.module';
import { RoomAvailableComponent } from './room-available.component';
import {Ng2TableModule} from "ng2-table";
import {ConfirmationPopoverModule} from "angular-confirmation-popover";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {NgxDaterangepickerMd} from "ngx-daterangepicker-material";
import {FormsModule} from "@angular/forms";
import {NgSelectModule} from "@ng-select/ng-select";

@NgModule({
    imports: [
        CommonModule,
        RoomAvailableRoutingModule,
        FormsModule,
        NgxDaterangepickerMd.forRoot(),
        Ng2TableModule,
        NgbModule,
        NgSelectModule,
        ConfirmationPopoverModule.forRoot({
            confirmButtonType: 'danger' // set defaults here
        })
    ],
    declarations: [RoomAvailableComponent]
})
export class RoomAvailableModule {}
