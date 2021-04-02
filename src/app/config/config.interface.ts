import { Observable } from 'rxjs';
import { ReadAllQuery } from '../config/read-all.query.type';

export interface Config {
    columnDefs: any[] | (() => any[]);
    load: (whereOptions, filterOptions, sortOptions) => void;
    dataRecords$: () => Observable<any[]>;
    pagination?: boolean;
}
