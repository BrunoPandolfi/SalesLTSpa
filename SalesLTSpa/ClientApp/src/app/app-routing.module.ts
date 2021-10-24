import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { CustomersIndexComponent } from './pages/customers/customers-index/customers-index.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {path:'Home', component: HomeComponent },
  {path: '', redirectTo:'/Home', pathMatch: 'full'},
  {path: '404', component: ErrorPageComponent},
  {path: '**', redirectTo: "/404"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
