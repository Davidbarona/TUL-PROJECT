import { Component, OnInit } from '@angular/core';
import {
  AlertController,
  LoadingController,
  MenuController,
  ToastController,
} from '@ionic/angular';
import { Producto } from 'src/app/models';
import { FireStoreService } from 'src/app/services/fire-store.service';
import { FirestorageService } from 'src/app/services/firestorage.service';

@Component({
  selector: 'app-set-products',
  templateUrl: './set-products.component.html',
  styleUrls: ['./set-products.component.scss'],
})
export class SetProductsComponent implements OnInit {
  productos: Producto[] = [];

  newProducts: Producto;

  // si no se clickea el boton nuevo no sale el form
  enableNewProduct: boolean = false;

  //route
  private path = '/Productos';
  
  // variable
  loading: any;
  newImage = '';
  newFile = '';

  constructor(
    public menuControler: MenuController,
    public fireStoreService: FireStoreService,
    public loadingController: LoadingController,
    public toastController: ToastController,
    public alertController: AlertController,
    public fireStorageService: FirestorageService
  ) {}

  ngOnInit() {
    this.getProducts();
  }

  openMenu() {
    console.log('open menu');
    this.menuControler.toggle('first');
  }

  async guardarProducto() {
    this.presentLoading();

    const path = 'Productos';
    const name = this.newProducts.name;
    const res = await this.fireStorageService.uploadImage(this.newFile, path, name);
    this.newProducts.foto = res;
    this.fireStoreService
      .createProduct(this.newProducts, this.path, this.newProducts.id)
      .then((res) => {
        this.loading.dismiss();
        this.presentToast('guardado con éxito');
      })
      .catch((error) => {
        this.presentToast('Algo no salió como esperaba :(');
      });
  }

  getProducts() {
    this.fireStoreService
      .getColletcion<Producto>(this.path)
      .subscribe((res) => {
        this.productos = res;
      });
  }

  async deleteProduct(producto: Producto) {
    const alert = await this.alertController.create({
      cssClass: 'paragraph',
      header: 'Advertencia',
      message: '¿Seguro desea <strong>eliminar</strong> este registro ?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'paragraph',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
            this.alertController.dismiss();
          },
        },
        {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
            this.fireStoreService
              .deleteProduct(this.path, producto.id)
              .then((res) => {
                this.presentToast('Eliminado con éxito');
                this.alertController.dismiss();
              })
              .catch((error) => {
                this.presentToast('Algo no salió como esperaba :(');
              });
          },
        },
      ],
    });

    await alert.present();
  }

  newItem() {
    this.enableNewProduct = true;

    this.newProducts = {
      name: '',
      identificador: '',
      descripcion: '',
      precio: null,
      foto: '',
      id: this.fireStoreService.getId(),
      fecha: new Date(),
    };
  }

  async newImageUpload(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.newFile = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (image) => {
        this.newProducts.foto = image.target.result as string;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  // funcionalidades Ionic
  //carga de loading para componente creación producto
  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'paragraph',
      message: 'guardando...',
    });
    await this.loading.present();
  }

  // mensaje de guardado
  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      cssClass: 'paragraph',
      message: msg,
      duration: 2000,
      color: 'primary',
    });
    toast.present();
  }
}
