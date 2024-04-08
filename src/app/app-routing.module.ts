import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginPageComponent} from "./components/login-page/login-page.component";
import {RegisterPageComponent} from "./components/register-page/register-page.component";
import {PricesPageComponent} from "./components/prices-page/prices-page.component";

const routes: Routes = [
  {path: 'login', component: LoginPageComponent},
  {path: 'register', component: RegisterPageComponent},
  {path: 'prices', component: PricesPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
