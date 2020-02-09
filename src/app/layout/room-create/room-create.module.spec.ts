import { RoomCreateModule } from './room-create.module';

describe('RoomCreateModule', () => {
    let roomCreateModule: RoomCreateModule;

    beforeEach(() => {
        roomCreateModule = new RoomCreateModule();
    });

    it('should create an instance', () => {
        expect(roomCreateModule).toBeTruthy();
    });
});
