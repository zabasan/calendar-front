import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuestCreateComponent } from './guest-create.component';

const routes: Routes = [
    {
        path: '',
        component: GuestCreateComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GuestCreateRoutingModule {}
