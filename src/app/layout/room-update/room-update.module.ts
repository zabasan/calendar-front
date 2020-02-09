import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomUpdateRoutingModule } from './room-update-routing.module';
import { RoomUpdateComponent } from './room-update.component';
import {FormsModule} from "@angular/forms";
import {PageHeaderModule} from "../../shared/modules";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

@NgModule({


    imports: [CommonModule, RoomUpdateRoutingModule, FormsModule, PageHeaderModule, NgbModule],
    declarations: [RoomUpdateComponent]
})
export class RoomUpdateModule {}
