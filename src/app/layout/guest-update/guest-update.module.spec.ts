import { GuestUpdateModule } from './guest-update.module';

describe('GuestUpdateModule', () => {
    let guestUpdateModule: GuestUpdateModule;

    beforeEach(() => {
        guestUpdateModule = new GuestUpdateModule();
    });

    it('should create an instance', () => {
        expect(guestUpdateModule).toBeTruthy();
    });
});
