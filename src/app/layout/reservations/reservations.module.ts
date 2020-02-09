import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationsRoutingModule } from './reservations-routing.module';
import { ReservationsComponent } from './reservations.component';
import {Ng2TableModule} from "ng2-table";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {ConfirmationPopoverModule} from "angular-confirmation-popover";

@NgModule({
    imports: [
        CommonModule,
        ReservationsRoutingModule,
        Ng2TableModule,
        NgbModule.forRoot(),
        ConfirmationPopoverModule.forRoot({
            confirmButtonType: 'danger' // set defaults here
        })
    ],
    declarations: [ReservationsComponent]
})
export class ReservationsModule {}
