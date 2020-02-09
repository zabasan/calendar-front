import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReserveRoomRoutingModule } from './reserve-room-routing.module';
import { ReserveRoomComponent } from './reserve-room.component';
import {PageHeaderModule} from "../../shared/modules";
import {FormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

@NgModule({
    imports: [CommonModule, ReserveRoomRoutingModule, FormsModule, PageHeaderModule, NgbModule],
    declarations: [ReserveRoomComponent]
})
export class ReserveRoomModule {}
