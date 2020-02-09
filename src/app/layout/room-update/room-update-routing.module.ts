import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoomUpdateComponent } from './room-update.component';

const routes: Routes = [
    {
        path: '',
        component: RoomUpdateComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RoomUpdateRoutingModule {}
