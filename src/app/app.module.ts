import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AgGridModule } from 'ag-grid-angular';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableComponent } from './pages/table/table.component';
import { HomeComponent } from './pages/home/home.component';
import { PaginatorComponent } from './pages/paginator/paginator.component';
import { TableToolbarComponent } from './pages/table-toolbar/table-toolbar.component';
import { OmbObjectCodeDeleteComponent } from './pages/individual-crud/omb-object-codes/omb-object-code-delete/omb-object-code-delete.component';
import { BocServiceProviderDeleteComponent } from './pages/individual-crud/boc-service-providers/boc-service-provider-delete/boc-service-provider-delete.component';
import { DeleteComponent } from './pages/shared-crud/delete/delete.component';
import { FormComponent } from './pages/shared-crud/form/form.component';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    HomeComponent,
    PaginatorComponent,
    TableToolbarComponent,
    OmbObjectCodeDeleteComponent,
    BocServiceProviderDeleteComponent,
    DeleteComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDialogModule,
    BrowserAnimationsModule,
    AgGridModule.withComponents(null)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
