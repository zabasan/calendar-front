import { ReservationUpdateModule } from './reservation-update.module';

describe('ReservationUpdateModule', () => {
    let reservationUpdateModule: ReservationUpdateModule;

    beforeEach(() => {
        reservationUpdateModule = new ReservationUpdateModule();
    });

    it('should create an instance', () => {
        expect(reservationUpdateModule).toBeTruthy();
    });
});
