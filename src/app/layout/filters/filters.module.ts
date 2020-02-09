import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FiltersRoutingModule} from './filters-routing.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {NgxSelectModule} from 'ngx-select-ex';
import {PageHeaderModule} from '../../shared';

@NgModule({
    imports: [CommonModule, FiltersRoutingModule, PageHeaderModule, FormsModule, NgbModule, NgxSelectModule],
    declarations: []
})
export class FiltersModule {}
