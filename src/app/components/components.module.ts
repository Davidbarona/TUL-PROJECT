import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product/product.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { CaritemComponent } from './caritem/caritem.component';



@NgModule({
  declarations: [ProductComponent,CaritemComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ],exports:[
    ProductComponent,
    CaritemComponent
  ]
})
export class ComponentsModule { }
