import { GuestCreateModule } from './guest-create.module';

describe('GuestCreateModule', () => {
    let guestCreateModule: GuestCreateModule;

    beforeEach(() => {
        guestCreateModule = new GuestCreateModule();
    });

    it('should create an instance', () => {
        expect(guestCreateModule).toBeTruthy();
    });
});
