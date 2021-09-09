import { Component, Input, OnInit } from '@angular/core';
import { Producto } from 'src/app/models';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  @Input() producto:Producto

  constructor(public cartservice:CartService) { }

  ngOnInit() {
    console.log('el producto es',this.producto)
  }

  addCart(){
    this.cartservice.addProduct(this.producto )
  }

 

}
