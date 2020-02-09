import { ReservedModule } from './reserved.module';

describe('ReservedModule', () => {
    let reservedModule: ReservedModule;

    beforeEach(() => {
        reservedModule = new ReservedModule();
    });

    it('should create an instance', () => {
        expect(reservedModule).toBeTruthy();
    });
});
