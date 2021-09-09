import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ProductoCarrito } from 'src/app/models';
import { CartService } from 'src/app/services/cart.service';
import { FireStoreService } from 'src/app/services/fire-store.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnDestroy {
  @Input() pedido: ProductoCarrito;

  cartSubscriber: Subscription;

  total: number;
  cant: number;

  constructor(
              public menuController: MenuController,
              public firestoreservice: FireStoreService,
              public cartService: CartService,
              public firebaseauthservice:AuthService,
  ) {
    this.initCart();
    this.loadPedido();
  }

  ngOnInit() {}

  ngOnDestroy() {
    if (this.cartSubscriber) {
      this.cartSubscriber.unsubscribe();
    }
  }

  openMenu() {
    console.log('open menu');
    this.menuController.toggle('first');
  }

  loadPedido() {
    this.cartSubscriber = this.cartService.getCart().subscribe((res) => {
      this.pedido = res;
      this.getTotal();
      this.getCant();
    });
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

  getTotal() {
    this.total = 0;
    this.pedido.productos.forEach((productos) => {
      this.total = productos.producto.precio * productos.quantity + this.total;
    });
  }

  getCant() {
    this.cant = 0;
    this.pedido.productos.forEach((productos) => {
      this.cant =  productos.quantity + this.cant;
    });
  }

  async order(){
     
     if(!this.pedido.productos.length){
      console.log('Añade Items al carrito')
       return 
     }
    this.pedido.precioTotal = this.total
    this.pedido.uid = this.firestoreservice.getId()
   const uid =  await this.firebaseauthservice.getUid()
  
    const path = "Cliente/" + uid + '/pedidos'
    console.log("solcitud tienda",this.pedido,uid,path)
    this.firestoreservice.createProduct(this.pedido,path,this.pedido.uid).then( () =>{
      console.log('guardado con éxito')
      this.cartService.clearCar()
    })
  }
}
