import { Injectable } from '@angular/core';

@Injectable()
export class CommunicationServiceService {

    public arrayFromService: Array<any>;

    setArray(array: any) {
        this.arrayFromService = array;
    }

    getArray() {
        return this.arrayFromService;
    }
}