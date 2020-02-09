import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GuestUpdateRoutingModule } from './guest-update-routing.module';
import { GuestUpdateComponent } from './guest-update.component';
import {FormsModule} from '@angular/forms';
import {PageHeaderModule} from '../../shared/modules';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [CommonModule, GuestUpdateRoutingModule, FormsModule, PageHeaderModule, NgbModule],
    declarations: [GuestUpdateComponent]
})
export class GuestUpdateModule {}
