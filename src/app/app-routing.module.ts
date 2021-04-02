import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { AppComponent } from './app.component';
import { bocServiceProviders, ombObjectCodes } from './db';
import { HomeComponent } from './pages/home/home.component';
import { TableComponent } from './pages/table/table.component';

const hide = (hidden: boolean) => {
  return hidden
}

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'omb-object-codes', component: TableComponent, data: {
      _context: {
        dataRecords$: new BehaviorSubject<any[]>([]),
        filterChanged$: new Subject()
      },
      _getOmbObjectCodes: function (pageOptions, filterOptions, sortOptions) {
        return ombObjectCodes;;
      },
      load: function (pageOptions, filterOptions, sortOptions) {
        const records: any[] = this._getOmbObjectCodes(pageOptions, filterOptions, sortOptions);

        this._context.dataRecords$.next(records);
      },
      dataRecords$: function () {
        return this._context.dataRecords$.asObservable();
      },
      columnDefs: async () => {
        return [
          {
            headerName: 'Code',
            field: 'code'
          },
          {
            headerName: 'Description',
            field: 'description'
          },
          {
            headerName: 'OMB Object Group',
            field: 'ombObjectGroup'
          },
          {
            headerName: 'Created By',
            field: 'createdBy'
          },
          {
            headerName: 'Updated By',
            field: 'updatedBy'
          },

        ]
      }
    },
  },
  {
    path: 'boc-service-providers', component: TableComponent, data: {

      columnDefs: [
        {
          headerName: 'Number',
          field: 'number'
        },
        {
          headerName: 'Suffix',
          field: 'suffix'
        },
        {
          headerName: 'Name',
          field: 'name'
        },
        {
          headerName: 'Long Name',
          field: 'longName'
        },
        {
          headerName: 'Key Words',
          field: 'keyWords'
        },
        {
          headerName: 'Narrative',
          field: 'narrative'
        },
        {
          headerName: 'Created By',
          field: 'createdBy',
          hide: hide(true)
        },
        {
          headerName: 'Updated By',
          field: 'updatedBy'
        },
      ]
    },
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
