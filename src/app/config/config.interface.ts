import { Observable } from 'rxjs';
import { ReadAllQuery } from '../config/read-all.query.type';

export interface Config {
    columnDefs: any[] | (() => any[]);
    loadPage: (whereOptions, filterOptions, sortOptions) => void;
    pageRecords$: () => Observable<any[]>;
    pagination?: boolean;
    ui: any;
}
