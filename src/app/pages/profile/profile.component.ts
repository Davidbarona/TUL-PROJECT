import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Cliente } from 'src/app/models';
import { AuthService } from 'src/app/services/auth.service';
import { FireStoreService } from 'src/app/services/fire-store.service';
import { FirestorageService } from 'src/app/services/firestorage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  cliente: Cliente = {
    uid: '',
    nombre: '',
    email: '',
    password: '',
    foto: '',
    referencia: '',
    ubicacion: null,
  };

  newFile = '';
  uid = '';
  suscriberUserInfo:Subscription
  ingresarEnable=false;

  constructor(
    public menuController: MenuController,
    public firebaseauthservice: AuthService,
    public fireStoreService: FireStoreService,
    public fireStorageService: FirestorageService
  ) {
    this.firebaseauthservice.stateAuth().subscribe((res) => {
      console.log(res )
      if (res !== null) {
        this.uid = res.uid;
        this.getUserInfo(this.uid);
      } else {
        this.initCliente()
      }
    });
  }

  async ngOnInit() {
    const uid = await this.firebaseauthservice.getUid();
    console.log(uid);
  }

  initCliente (){
    this.uid = '';
        this.cliente = {
          uid: '',
          nombre: '',
          email: '',
          password: '',
          foto: '',
          referencia: '',
          ubicacion: null,
        };

        console.log(this.cliente)
  }

  openMenu() {
    console.log('open menu');
    this.menuController.toggle('first');
  }

  async newImageUpload(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.newFile = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (image) => {
        this.cliente.foto = image.target.result as string;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  async registrarse() {
    const credenciales = {
      email: this.cliente.email,
      password: this.cliente.password,
    };

    const response = await this.firebaseauthservice
      .register(credenciales.email, credenciales.password)
      .catch((err) => {
        console.log('error', err);
      });
    const uid = await this.firebaseauthservice.getUid();
    this.cliente.uid = uid;
    this.guardarUsuario();
  }

  async salir() {
    this.firebaseauthservice.logOut();
    this.suscriberUserInfo.unsubscribe()
  }

  async guardarUsuario() {
    const path = 'Cliente';
    const name = this.cliente.nombre;
    if (this.newFile !== undefined) {
      const res = await this.fireStorageService.uploadImage(
        this.newFile,
        path,
        name
      );
      this.cliente.foto = res;
    }
    this.fireStoreService
      .createProduct(this.cliente, path, this.cliente.uid)
      .then((res) => {
        console.log('guardado con éxito');
      })
      .catch((error) => {});
  }

  getUserInfo(uid: string) {
    console.log('getUserInfo')
    const path = 'Cliente';
    this.suscriberUserInfo =  this.fireStoreService.getProduct<Cliente>(path, uid).subscribe((res) => {
      this.cliente = res;
    });
  }

  ingresar(){
    const credenciales = {
      email: this.cliente?.email,
      password: this.cliente.password,
    };
    this.firebaseauthservice.login(credenciales.email,credenciales.password).then(res =>{
        console.log('ingresoso',res)
    })
  }

 async  ingresarGoogle(){
   await this.firebaseauthservice.loginGoogle()
  }
}
