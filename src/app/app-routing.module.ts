import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { TableComponent } from './pages/table/table.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'omb-object-codes', component: TableComponent, data: {table: "omb-object-codes"}},
  {path: 'boc-service-providers', component: TableComponent, data: {table: "boc-service-providers"}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
