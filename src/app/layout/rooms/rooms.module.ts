import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomsRoutingModule } from './rooms-routing.module';
import { RoomsComponent } from './rooms.component';
import {Ng2TableModule} from "ng2-table";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {ConfirmationPopoverModule} from "angular-confirmation-popover";

@NgModule({
    imports: [
        CommonModule,
        RoomsRoutingModule,
        Ng2TableModule,
        NgbModule,
        ConfirmationPopoverModule.forRoot({
            confirmButtonType: 'danger' // set defaults here
        })
    ],
    declarations: [RoomsComponent]
})
export class RoomsModule {}
