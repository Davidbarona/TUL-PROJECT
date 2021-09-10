import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { FireStoreService } from 'src/app/services/fire-store.service';
import { ProductoCarrito } from 'src/app/models';

@Component({
  selector: 'app-mispedidos',
  templateUrl: './mispedidos.component.html',
  styleUrls: ['./mispedidos.component.scss'],
})
export class MispedidosComponent implements OnInit, OnDestroy {

  newSubscriber: Subscription;
  oldSusbcriber:Subscription;
  order:ProductoCarrito[]=[]

  constructor(public menuController:MenuController,
              public firestoreservice: FireStoreService,
              public firebaseauthservice:AuthService ) { }

  ngOnInit() {
    this.getNewOrder()
  }

  ngOnDestroy() {
    if(this.newSubscriber){
      this.newSubscriber.unsubscribe()
    }
    if(this.oldSusbcriber){
      this.oldSusbcriber.unsubscribe()
    }
  }

  openMenu() {
    console.log('open menu');
    this.menuController.toggle('first');
  }

  selection(evento:any){
    //console.log('mensaje de envío select',evento.detail.value)
    const option = evento.detail.value;
    if(option === "culminados"){
      this.getPastOrder()
    }if(option ==="nuevos"){
      this.getNewOrder()
    }
  }

 async getNewOrder(){
    console.log(this.getNewOrder)
    const uid =  await this.firebaseauthservice.getUid()
    const path = "Cliente/" + uid + '/pedidos'
    this.newSubscriber = this.firestoreservice.getColletcionQuery<ProductoCarrito>(path,'estadoPedido','==','enviado').subscribe(res =>{
      if(res.length){
        this.order = res 
       
      }
    })
  }

  async getPastOrder(){
      console.log('get culminados')
      console.log(this.getNewOrder)
    const uid =  await this.firebaseauthservice.getUid()
    const path = "Cliente/" + uid + '/pedidos'
    this.oldSusbcriber = this.firestoreservice.getColletcionQuery<ProductoCarrito>(path,'estadoPedido','==','completado').subscribe(res =>{
      if(res.length){
        this.order = res 
       
      }
    })
  }

}  
