import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersIndexComponent } from './pages/customers/customers-index/customers-index.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {path:'Home', component: HomeComponent },
  {path: '', pathMatch: 'full', redirectTo:'Home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
