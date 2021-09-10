import { Injectable } from '@angular/core';


//Import FireBase
import {AngularFirestore} from '@angular/fire/compat/firestore'

@Injectable({
  providedIn: 'root'
})
export class FireStoreService {

  constructor(public database:AngularFirestore) {}
  
  createProduct(data:any, path:string,id:string){
    const collection = this.database.collection(path)
    return collection.doc(id).set(data) // si hay un documento con este id, se realiza la acción 
  }

  getProduct<tipo>(path:string, id:string){
    const collection = this.database.collection<tipo>(path)
    return collection.doc(id).valueChanges() //observable
  }

  deleteProduct(path:string,id:string){
    const collection = this.database.collection(path)
    return collection.doc(id).delete()
  }

  updateProduct(data:any,path:string,id:string){
    const collection = this.database.collection(path)
    return collection.doc(id).update(data)
  }

  getId(){
  return  this.database.createId()
  }

  getColletcion<tipo>(path:string){
    const collection = this.database.collection<tipo>(path)
    return collection.valueChanges(path)
  }


  //ctrae una colección en base a una busqueda
  getColletcionQuery<tipo>(path:string,params:string,condition:any,query:string){
    const collection = this.database.collection<tipo>(path,
    ref=> ref.where(params, condition,query) )
    return collection.valueChanges(path)
  }

}
