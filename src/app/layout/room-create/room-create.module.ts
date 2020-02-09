import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomCreateRoutingModule } from './room-create-routing.module';
import { RoomCreateComponent } from './room-create.component';
import {FormsModule} from "@angular/forms";
import {PageHeaderModule} from "../../shared/modules";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

@NgModule({


    imports: [CommonModule, RoomCreateRoutingModule, FormsModule, PageHeaderModule, NgbModule],
    declarations: [RoomCreateComponent]
})
export class RoomCreateModule {}
