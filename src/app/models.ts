

export interface Producto{
  name:string;
  identificador:string;
  descripcion:string;
  precio:number;
  foto:string;
  id:string;
  fecha:Date;
}

export interface Cliente{
  uid:string;
  nombre:string,
  email:string;
  password:string;
  foto:string;
  referencia:string;
  ubicacion:any,
}

export interface Carrito {
  producto:Producto,
  uid:string,
  quantity:number,
  
}

export interface ProductoCarrito{
  uid:string,
  cart_id:Carrito["uid"]
  cliente:Cliente,
  productos:Carrito[]
  precioTotal:number,
  estadoPedido:EstadoPedido,
  


}


export type EstadoPedido = 'complete' | 'sending'