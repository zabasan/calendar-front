import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' },
            { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
            { path: 'charts', loadChildren: './charts/charts.module#ChartsModule' },
            { path: 'tables', loadChildren: './tables/tables.module#TablesModule' },
            { path: 'forms', loadChildren: './form/form.module#FormModule' },
            { path: 'bs-element', loadChildren: './bs-element/bs-element.module#BsElementModule' },
            { path: 'grid', loadChildren: './grid/grid.module#GridModule' },
            { path: 'components', loadChildren: './bs-component/bs-component.module#BsComponentModule' },
            { path: 'blank-page', loadChildren: './blank-page/blank-page.module#BlankPageModule' },
            { path: 'rooms', loadChildren: './rooms/rooms.module#RoomsModule' },
            { path: 'guests', loadChildren: './guests/guests.module#GuestsModule' },
            { path: 'guest/create', loadChildren: './guest-create/guest-create.module#GuestCreateModule' },
            { path: 'guest/:id', loadChildren: './guest-update/guest-update.module#GuestUpdateModule' },
            { path: 'room-available', loadChildren: './room-available/room-available.module#RoomAvailableModule' },
            { path: 'room/create', loadChildren: './room-create/room-create.module#RoomCreateModule' },
            { path: 'room/:id', loadChildren: './room-update/room-update.module#RoomUpdateModule' },
            { path: 'calendar', loadChildren: './calendar/calendar.module#CalendarModule' },
            { path: 'reserve-rooms', loadChildren: './reserve-room/reserve-room.module#ReserveRoomModule' },
            { path: 'reserved', loadChildren: './reserved/reserved.module#ReservedModule' },
            { path: 'reservations', loadChildren: './reservations/reservations.module#ReservationsModule' },
            { path: 'reservation/:id', loadChildren: './reservation-update/reservation-update.module#ReservationUpdateModule' },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
