import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservedRoutingModule } from './reserved-routing.module';
import { ReservedComponent } from './reserved.component';

@NgModule({
    imports: [CommonModule, ReservedRoutingModule],
    declarations: [ReservedComponent]
})
export class ReservedModule {}
