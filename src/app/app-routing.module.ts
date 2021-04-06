import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TableComponent } from './pages/table/table.component';
import { bocServiceProvidersConfig } from './reference-tables/boc-service-providers/boc-service-providers.config';
import { ombObjectCodesConfig } from './reference-tables/omb-object-codes/omb-object-codes.config';


const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'omb-object-codes', component: TableComponent, data: ombObjectCodesConfig,
  },
  {
    path: 'boc-service-providers', component: TableComponent, data: bocServiceProvidersConfig,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
