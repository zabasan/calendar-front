import { GuestsModule } from './guests.module';

describe('GuestsModule', () => {
    let guestsModule: GuestsModule;

    beforeEach(() => {
        guestsModule = new GuestsModule();
    });

    it('should create an instance', () => {
        expect(guestsModule).toBeTruthy();
    });
});
