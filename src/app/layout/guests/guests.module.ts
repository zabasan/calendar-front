import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuestsRoutingModule } from './guests-routing.module';
import { GuestsComponent } from './guests.component';
import {Ng2TableModule} from "ng2-table";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {ConfirmationPopoverModule} from "angular-confirmation-popover";

@NgModule({
    imports: [
        CommonModule,
        GuestsRoutingModule,
        Ng2TableModule,
        NgbModule,
        ConfirmationPopoverModule.forRoot({
            confirmButtonType: 'danger' // set defaults here
        })
    ],
    declarations: [GuestsComponent]
})
export class GuestsModule {}
