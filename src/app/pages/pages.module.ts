import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';
import { CartComponent } from './cart/cart.component';
import { MispedidosComponent } from './mispedidos/mispedidos.component';



@NgModule({
  declarations: [HomeComponent,ProfileComponent,CartComponent,MispedidosComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    FormsModule,
    ComponentsModule
  ]
})
export class PagesModule { }
