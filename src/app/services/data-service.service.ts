import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ReadAllQuery } from '../config/read-all.query.type';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor() { }

  readall(query: ReadAllQuery, pageOptions: any, filterOptions: any, sortOptions: any) {
    return query();
  }

}
