import { RoomAvailableModule } from './room-available.module';

describe('RoomAvailableModule', () => {
    let roomAvailableModule: RoomAvailableModule;

    beforeEach(() => {
        roomAvailableModule = new RoomAvailableModule();
    });

    it('should create an instance', () => {
        expect(roomAvailableModule).toBeTruthy();
    });
});
