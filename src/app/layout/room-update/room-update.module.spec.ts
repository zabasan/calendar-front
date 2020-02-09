import { RoomUpdateModule } from './room-update.module';

describe('RoomUpdateModule', () => {
    let roomUpdateModule: RoomUpdateModule;

    beforeEach(() => {
        roomUpdateModule = new RoomUpdateModule();
    });

    it('should create an instance', () => {
        expect(roomUpdateModule).toBeTruthy();
    });
});
