import { Component, Input, OnInit } from '@angular/core';
import { Carrito} from 'src/app/models';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-caritem',
  templateUrl: './caritem.component.html',
  styleUrls: ['./caritem.component.scss'],
})
export class CaritemComponent implements OnInit {
  
  @Input() producto:Carrito
  @Input() botones=true

  constructor(public cartservice:CartService) { }

  ngOnInit() {}
  
  addCart(){
    console.log('add carrito')
    this.cartservice.addProduct(this.producto.producto)
  }
  

  removeCart(){
     this.cartservice.removeProduct(this.producto.producto) 
  }
}
