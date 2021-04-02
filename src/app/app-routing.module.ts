import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { bocServiceProviders, ombObjectCodes } from './db';
import { HomeComponent } from './pages/home/home.component';
import { TableComponent } from './pages/table/table.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'omb-object-codes', component: TableComponent, data: {
      readAll: () => {
        return ombObjectCodes;
      },
      columnDefs: () => {
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
      readAll: () => {
        return bocServiceProviders;
      },
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
          field: 'createdBy'
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
