import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GuestCreateRoutingModule } from './guest-create-routing.module';
import { GuestCreateComponent } from './guest-create.component';
import {FormsModule} from '@angular/forms';
import {PageHeaderModule} from '../../shared/modules';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [CommonModule, GuestCreateRoutingModule, FormsModule, PageHeaderModule, NgbModule],
    declarations: [GuestCreateComponent]
})
export class GuestCreateModule {}
