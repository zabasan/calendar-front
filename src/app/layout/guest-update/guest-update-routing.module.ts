import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuestUpdateComponent } from './guest-update.component';

const routes: Routes = [
    {
        path: '',
        component: GuestUpdateComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GuestUpdateRoutingModule {}
