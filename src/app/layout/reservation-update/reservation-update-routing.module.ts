import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReservationUpdateComponent } from './reservation-update.component';

const routes: Routes = [
    {
        path: '',
        component: ReservationUpdateComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ReservationUpdateRoutingModule {}
