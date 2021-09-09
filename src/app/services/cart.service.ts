import { isNgTemplate } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { Carrito, Cliente, Producto, ProductoCarrito } from '../models';
import { AuthService } from './auth.service';
import { FireStoreService } from './fire-store.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private pedido: ProductoCarrito;
  pedido$ = new Subject<ProductoCarrito>();
  path = 'cart/';
  uid = '';
  cliente: Cliente;

  constructor(
    public firebaseauthservice: AuthService,
    public firestorageservice: FireStoreService,
    public router: Router
  ) {
    //Observable
    this.firebaseauthservice.stateAuth().subscribe((res) => {
      console.log(res);
      if (res !== null) {
        this.uid = res.uid;
        this.loadClient();
      }
    });
  }

  loadCart() {
    const path = 'Cliente/' + this.uid + '/' + this.path;
    this.firestorageservice
      .getProduct<ProductoCarrito>(path, this.uid)
      .subscribe((res) => {
        console.log(res);
        if (res) {
          this.pedido = res;
          // se actualiza el observable, se creó una acción dentro de el
          this.pedido$.next(this.pedido);
        } else {
          this.initCart();
        }
      });
  }

  //inicializar carrito
  initCart() {
    this.pedido = {
      uid: this.uid,
      cliente: this.cliente,
      cart_id: '',
      productos: [],
      precioTotal: null,
      estadoPedido: 'sending',
    };
    this.pedido$.next(this.pedido);
  }
  //inicio cliente

  loadClient() {
    const path = 'Cliente';
    this.firestorageservice
      .getProduct<Cliente>(path, this.uid)
      .subscribe((res) => {
        this.cliente = res;
        this.loadCart();
      });
  }

  getCart(): Observable<ProductoCarrito> {
    return this.pedido$.asObservable();
  }

  addProduct(producto: Producto) {
    if (this.uid.length) {
      const item = this.pedido.productos.find((productoPedido) => {
        return productoPedido.producto.id === producto.id;
      });

      if (item !== undefined) {
        item.quantity++;
      } else {
        const add: Carrito = {
          uid: this.uid,
          quantity: 1,
          producto: producto,
        };
        this.pedido.productos.push(add);
      }
    } else {
      this.router.navigate(['profile']);
      return;
    }
    console.log('estamos en add ', this.pedido);
    const path = 'Cliente/' + this.uid + '/' + this.path;
    this.firestorageservice
      .createProduct(this.pedido, path, this.uid)
      .then((res) => {
        console.log('añadido con éxito');
      });
  }

  removeProduct(producto: Producto) {
    console.log('remove producto ', this.uid);
    if (this.uid.length) {
      let position = 0;
      const item = this.pedido.productos.find((productoPedido, index) => {
        position = index;
        return productoPedido.producto.id === producto.id;
      });
    
      if (item !== undefined) {
        item.quantity--;
        if (item.quantity === 0) {
          this.pedido.productos.splice(position, 1);
        }
        console.log('estamos en remove  ', this.pedido);
        const path = 'Cliente/' + this.uid + '/' + this.path;
        this.firestorageservice
          .createProduct(this.pedido, path, this.uid)
          .then((res) => {
            console.log('removido con éxito');
          });
      }
    }
  }

  generateOrder() {}

  clearCarrito() {}
}
