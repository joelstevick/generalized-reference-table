import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
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

      // private
      // stores required BehaviorSubject instances
      _context: {
        pageRecords$: new BehaviorSubject<any[]>([]),
        filterChanged$: new Subject()
      },
      // this is how data is retrieved from the (graphql) database
      _getOmbObjectCodes: function (pageOptions, filterOptions, sortOptions) {
        return ombObjectCodes(pageOptions, filterOptions, sortOptions);
      },
      // public api
      // this function is called from the paginator when navigation events are signalled by the table
      loadPage: function (pageOptions, filterOptions, sortOptions) {
        const records: any[] = this._getOmbObjectCodes(pageOptions, filterOptions, sortOptions);

        this._context.pageRecords$.next(records);
      },
      // stream that the table component listens-on
      pageRecords$: function () {
        return this._context.pageRecords$.asObservable();
      },
      // ag-grid column metadata
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
            field: 'ombObjectGroup',
            valueFormatter: (params) => params.value ? params.value.description : null
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
      _context: {
        pageRecords$: new BehaviorSubject<any[]>([]),
        filterChanged$: new Subject()
      },
      _getBocServiceProviders: function (pageOptions, filterOptions, sortOptions) {
        return bocServiceProviders;;
      },
      loadPage: function (pageOptions, filterOptions, sortOptions) {
        const records: any[] = this._getBocServiceProviders(pageOptions, filterOptions, sortOptions);

        this._context.pageRecords$.next(records);
      },
      pageRecords$: function () {
        return this._context.pageRecords$.asObservable();
      },
      pagination: false,
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
