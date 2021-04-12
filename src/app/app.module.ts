import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AgGridModule } from 'ag-grid-angular';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableComponent } from './pages/table/table.component';
import { HomeComponent } from './pages/home/home.component';
import { PaginatorComponent } from './pages/table/components/paginator/paginator.component';
import { ToolbarComponent } from './pages/table/components/toolbar/toolbar.component';
import { OmbObjectCodeDeleteComponent } from './reference-tables/omb-object-codes/modals/omb-object-code-delete/omb-object-code-delete.component';
import { BocServiceProviderDeleteComponent } from './reference-tables/boc-service-providers/modals/boc-service-provider-delete/boc-service-provider-delete.component';
import { DeleteComponent } from './pages/shared-modals/delete/delete.component';
import { FormComponent } from './pages/shared-modals/form/form.component';
import { SortComponent } from './pages/table/components/toolbar/sort/sort.component';
import { FilterComponent } from './pages/table/components/toolbar/filter/filter.component';
import { OmbObjectCodeFormComponent } from './reference-tables/omb-object-codes/modals/omb-object-code-form/omb-object-code-form.component';
import { BocServiceProviderFormComponent } from './reference-tables/boc-service-providers/modals/boc-service-provider-form/boc-service-provider-form.component';

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
    FormComponent,
    SortComponent,
    FilterComponent,
    OmbObjectCodeFormComponent,
    BocServiceProviderFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AgGridModule.withComponents(null)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
