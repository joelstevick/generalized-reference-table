import { Injectable } from '@angular/core';
import { ReadAllQuery } from '../config/read-all.query.type';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor() { }

  readall(query: ReadAllQuery) {
    return query();
  }

}
