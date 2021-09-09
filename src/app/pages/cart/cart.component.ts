import { Component, Input, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ProductoCarrito } from 'src/app/models';
import { CartService } from 'src/app/services/cart.service';
import { FireStoreService } from 'src/app/services/fire-store.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  
 @Input() pedido:ProductoCarrito

  constructor(public menuController:MenuController,
              public firestoreservice:FireStoreService,
              public cartService:CartService) { 
          
          this.initCart()
          this.loadPedido()
 }

  ngOnInit() {}
  

  openMenu() {
    console.log('open menu');
    this.menuController.toggle('first');
  }

  loadPedido(){
     this.cartService.getCart().subscribe(res =>{
       this.pedido = res
     })
  }

  initCart() {
    this.pedido = {
      uid: '',
      cliente: null,
      cart_id: '',
      productos: [],
      precioTotal: null,
      estadoPedido: 'sending',
    };
  }


}
