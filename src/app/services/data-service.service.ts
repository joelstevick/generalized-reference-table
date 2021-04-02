import { Injectable } from '@angular/core';
import {bocServiceProviders} from '../db';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor() { }


  bocServiceProviders() {
    return [
      {number: 1, suffix: "_STAFF", name: "STAFF", longName: "Staff Employee", keyWords: "Current Employee, Staff, Retired Employee, Separated Employee", narrative: "Payments or obligations is designated by a staff employee.", createdBy: 111111, updatedBy: 333333},
      {number: 2, suffix: "_CONTR", name: "CONTR", longName: "Industrial Contractor", keyWords: "Contractor, Commercial Entity, Private Entity", narrative: "Payments or obligations is designated by a private or commercial entity.", createdBy: 111111, updatedBy: 111111}
    ]
  }

  ombObjectCodes() {
    return [
      {code: "73.0", description: "Travel", ombObjectGroup: {description: "Travel"}, createdBy: 111111, updatedBy: 111111},
      {code: "71.0", description: "Training", ombObjectGroup: {description: "Training"}, createdBy: 333333, updatedBy: 333333},
      {code: "11.2", description: "Pay", ombObjectGroup: {description: "Pay and Benefits"}, createdBy: 111111, updatedBy: 111111}
    ]
  }
}
