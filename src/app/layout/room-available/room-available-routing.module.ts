import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoomAvailableComponent } from "./room-available.component";

const routes: Routes = [
    {
        path: '',
        component: RoomAvailableComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RoomAvailableRoutingModule {}
