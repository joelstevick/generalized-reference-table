import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AgGridModule } from 'ag-grid-angular';
import { MatDialogModule } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableComponent } from './pages/table/table.component';
import { HomeComponent } from './pages/home/home.component';
import { PaginatorComponent } from './pages/paginator/paginator.component';
import { ToolbarComponent } from './pages/toolbar/toolbar.component';
import { OmbObjectCodeDeleteComponent } from './reference-tables/omb-object-codes/modals/omb-object-code-delete/omb-object-code-delete.component';
import { BocServiceProviderDeleteComponent } from './reference-tables/boc-service-providers/modals/boc-service-provider-delete/boc-service-provider-delete.component';
import { DeleteComponent } from './pages/shared-modals/delete/delete.component';
import { FormComponent } from './pages/shared-modals/form/form.component';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    HomeComponent,
    PaginatorComponent,
    ToolbarComponent,
    OmbObjectCodeDeleteComponent,
    BocServiceProviderDeleteComponent,
    DeleteComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AgGridModule.withComponents(null)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
