import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class FiltersService {
    public showFilter$: Observable<boolean>;
    public filtersToShow$: Observable<object>;
    public filters$: Observable<object>;
    public isFilterShownSubject = new Subject<boolean>();
    public filtersToShowSubject = new Subject<object>();
    public filtersSubject = new Subject<object>();

    constructor() {
        this.showFilter$ = this.isFilterShownSubject.asObservable();
        this.filtersToShow$ = this.filtersToShowSubject.asObservable();
        this.filters$ = this.filtersSubject.asObservable();
    }

    showFilter(boolean) {
        this.isFilterShownSubject.next(boolean);
    }

    filterToShow(filters) {
        this.filtersToShowSubject.next(filters);
    }

    getFilters(filters) {
        this.filtersSubject.next(filters);
    }

    getFiltersparams(filters, params) {
        let result = params;
        let filter: any | undefined;
        const array = [];
        if (filters) {
            Object.keys(filters).forEach(key => {
                if (!filters[key]) {
                    delete filters[key];
                } else if (Array.isArray(filters[key])) {
                    console.log('asArray');
                   filters[key].forEach(item => {
                       array.push(item);
                       filter = array;
                   });
                } else {
                    filter = filters[key].toString();
                }
                if (filters[key] && !params.has(key)) {
                    if (Array.isArray(filter)) {
                        if (filter !==  undefined) {
                            filter.forEach(value => {
                                params = params.append(key, value);
                            });
                        }
                    } else {
                        if (filter !==  undefined && filter !== 'null') {
                            params = params.set(key, filter);
                        }
                    }
                }
                result = params;
            });
        }
        return result;
    }

    transformIdFilter(filters, model) {
        if (filters !==  undefined) {
            filters[model + '[]'] = filters['id[]'];
            delete filters['id[]'];
        }
        return filters;
    }


}
