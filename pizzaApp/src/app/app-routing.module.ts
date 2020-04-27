import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component'
import { RegisterComponent } from './register/register.component'
import { HomePageComponent } from './home-page/home-page.component'
import { AuthGuard } from './auth.guard';
import { MycartComponent } from './mycart/mycart.component';
import { OrderhistoryComponent } from './orderhistory/orderhistory.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'pizza',
    canActivate: [AuthGuard],
    component: HomePageComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'mycart',
    component: MycartComponent
  },
  {
    path: 'orderhistory',
    component: OrderhistoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
