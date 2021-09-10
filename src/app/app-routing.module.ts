import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SetProductsComponent } from './pages/backend/set-products/set-products.component';
import { CartComponent } from './pages/cart/cart.component';
import { HomeComponent } from './pages/home/home.component';
import { MispedidosComponent } from './pages/mispedidos/mispedidos.component';
import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes = [
  {path:'home',component:HomeComponent},
  {path:'set-products',component:SetProductsComponent},
  {path:'cart',component:CartComponent},
  {path:'profile',component:ProfileComponent},
  {path:'mis-pedidos',component:MispedidosComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  {path:'**', redirectTo:'home', pathMatch:"full"}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
