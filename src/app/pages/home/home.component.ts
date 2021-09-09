import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Producto } from 'src/app/models';
import { FireStoreService } from 'src/app/services/fire-store.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  
  private path ='Productos/'
  
  productos:Producto[]=[]
  constructor(public menuController:MenuController,
              public firestoreservice:FireStoreService) { 
        
          this.loadProductos()
              }

  ngOnInit() {}

  
  openMenu() {
    console.log('open menu');
    this.menuController.toggle('first');
  }

  loadProductos(){
    this.firestoreservice.getColletcion<Producto>(this.path).subscribe(res =>{
      console.log(res)
      this.productos=res
    })
  }

}
