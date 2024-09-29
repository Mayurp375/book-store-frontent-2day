import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginformComponent } from './loginform/loginform.component';
import { FetchPageComponent } from './fetch-page/fetch-page.component';
import { CartItemComponent } from './cart-item/cart-item.component';
import { AdminComponent } from './admin/admin.component';
import { OrdersHistoryComponent } from './orders-history/orders-history.component';
import { SellerDashboardComponent } from './seller-dashboard/seller-dashboard.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',component: FetchPageComponent
  },
  {
    path: 'login', component: LoginformComponent
  },
  {
    path: 'register',component: RegisterComponent
  }, 
  {
    path: 'cart', component: CartItemComponent
  },
  {
    path: 'admin', component: AdminComponent
  },
  {
    path: 'orders-history', component: OrdersHistoryComponent
  },
  {
    path: 'seller-dashboard', component: SellerDashboardComponent
  },
  {
    path: '**', redirectTo: 'home',
  }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
